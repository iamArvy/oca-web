import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";
import { API_ROUTES } from "~/constants";
import { UploadType } from "~/enums";
import {
  type ApiResponse,
  type AdAdminData,
  AdPlacement,
  AdDurationUnit,
  AdContentType,
} from "~/types";

type Mode = "edit" | "create";

export function useAdEditor(item?: AdAdminData | null, mode: Mode = "create") {
  const { success, error } = useToast();
  const { fileRef, upload } = useFileUpload();
  const { $api } = useNuxtApp();

  const createSchema = z.object({
    title: z.string().min(2).max(120),
    target: z.string().url().optional().or(z.literal("")),
    content: z.string().optional().or(z.literal("")),
    placement: z.nativeEnum(AdPlacement),
    contentType: z.nativeEnum(AdContentType),
    startDate: z.string().min(1),
    duration: z.number().min(1),
    durationUnit: z.nativeEnum(AdDurationUnit),
  });

  const updateSchema = createSchema.partial();

  const formSchema = toTypedSchema(
    mode === "create" ? createSchema : updateSchema,
  );

  // ------------------------------
  // 2️⃣ Initial values
  // ------------------------------
  const initialValues =
    mode === "create"
      ? {
          title: "",
          target: "",
          content: "",
          placement: AdPlacement.BANNER,
          contentType: AdContentType.IMAGE,
          startDate: "",
          duration: 1,
          durationUnit: AdDurationUnit.DAY,
        }
      : {
          title: item?.title ?? "",
          target: item?.target ?? "",
          content: item?.content ?? "",
          placement: item?.placement ?? AdPlacement.BANNER,
          contentType: item?.contentType ?? AdContentType.IMAGE,
          startDate: item?.startDate ?? "",
          duration: item?.duration ?? 1,
          durationUnit: item?.durationUnit ?? AdDurationUnit.DAY,
        };

  // ------------------------------
  // 3️⃣ Options for selects
  // ------------------------------
  const adPlacementOptions = Object.values(AdPlacement);
  const adDurationUnitOptions = Object.values(AdDurationUnit);
  const adContentTypeOptions = Object.values(AdContentType);

  // ------------------------------
  // 4️⃣ VeeValidate Form
  // ------------------------------
  const { handleSubmit, setValues, values } = useForm({
    validationSchema: formSchema,
    initialValues,
  });

  // ------------------------------
  // 5️⃣ Computed preview
  // ------------------------------
  const previewEndDate = computed(() => {
    if (!values.startDate || !values.duration || !values.durationUnit)
      return null;

    const date = new Date(values.startDate);

    const duration = values?.duration || 0;

    switch (values.durationUnit) {
      case AdDurationUnit.DAY:
        date.setDate(date.getDate() + duration);
        break;
      case AdDurationUnit.WEEK:
        date.setDate(date.getDate() + duration * 7);
        break;
      case AdDurationUnit.MONTH:
        date.setMonth(date.getMonth() + duration);
        break;
    }

    return date.toLocaleDateString();
  });

  // ------------------------------
  // 6️⃣ API calls
  // ------------------------------
  async function create(body: object) {
    return $api<ApiResponse>(API_ROUTES.admin.ads, {
      method: "POST",
      body,
    });
  }

  async function update(id: string, body: Record<string, unknown>) {
    return $api<ApiResponse>(API_ROUTES.admin.ad(id), {
      method: "PATCH",
      body: patchFilter(body),
    });
  }

  const onSubmit = handleSubmit(async (formValues) => {
    try {
      let res: ApiResponse | null = null;
      if (fileRef.value) {
        const { placement, contentType } = formValues;
        console.log("Form values on submit:", formValues);
        if (placement || contentType) {
          const metadata = {
            placement: placement as string,
            type: contentType as string,
          };
          const file = await upload(UploadType.AD, metadata);
          formValues.content = file?.url;
        }
      }
      switch (mode) {
        case "edit":
          if (item) res = await update(item.id, formValues);
          break;

        case "create":
          res = await create(formValues);
          break;
      }
      if (res) success(res.message);
      await refreshNuxtData();
    } catch (e: unknown) {
      error(handleError(e, "Error saving ad"));
    }
  });

  return {
    mode,
    values,
    setValues,
    onSubmit,
    previewEndDate,
    adPlacementOptions,
    adContentTypeOptions,
    adDurationUnitOptions,
    fileRef,
  };
}
