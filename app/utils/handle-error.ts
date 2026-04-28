export function handleError(
  e: unknown,
  fallback = "Something went wrong",
): string {
  if (e instanceof Error) {
    console.error(e);
    return e.message;
  }

  if (typeof e === "object" && e !== null && "message" in e) {
    return String((e as { message?: string }).message);
  }

  console.error(e);
  return fallback;
}
