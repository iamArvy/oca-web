export const patchFilter = (formValues: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(formValues).filter(([_, v]) => v !== undefined && v !== ""),
  );
