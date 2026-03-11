import { z } from "zod";
import type { ApiAuthResponse } from "~/interfaces";
import { apiRequest } from "../utils/api-request";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);

  try {
    const { user, token, message } =
      await apiRequest<ApiAuthResponse>("auth/login", {
        method: "POST",
        body,
      });

    await setUserSession(event, {
      user,
      token: token.token,
    });

    return { message };
  } catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || "Authentication failed",
    });
  }
});