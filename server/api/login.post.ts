import { z } from "zod";
import type { ApiResponse, AuthResponse } from "~/interfaces";
import { apiRequest } from "../utils/api-request";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);

  try {
    const { data, message } =
      await apiRequest<ApiResponse<AuthResponse>>("auth/login", {
        method: "POST",
        body,
      });

      
      if(!data) throw createError('Something went wrong')
      const {user, token} = data;

    await setUserSession(event, {
      user,
      token: token.token,
    });

    return { message };
  } catch (error: any) {
    console.log(error)
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.statusMessage || "Authentication failed",
    });
  }
});