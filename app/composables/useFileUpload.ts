import { API_ROUTES } from "~/constants";
import type { UploadType } from "~/enums";
import type { ApiResponse, FileData } from "~/types";

export function useFileUpload() {
  const { error } = useToast();
  const { $api } = useNuxtApp();

  // ✅ holds the selected file
  const fileRef = ref<File | null>(null);

  async function upload(type: UploadType, metadata?: Record<string, string>) {
    if (!fileRef.value) {
      error("Please select a file");
      return null;
    }

    try {
      const formData = new FormData();
      formData.append("file", fileRef.value);
      if (metadata) {
        formData.append("metadata", JSON.stringify(metadata));
      }
      const res = await $api<ApiResponse<FileData>>(
        API_ROUTES.admin.upload(type),
        {
          method: "POST",
          body: formData,
        },
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  return {
    fileRef,
    upload,
  };
}
