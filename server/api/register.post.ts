import { z } from "zod";
import type { ApiResponse, AuthResponse } from "~/interfaces";
import { apiRequest } from "../utils/api-request";

const bodySchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(50),
  email: z.string().email('Email must be a valid email'),
  password: z.string().min(8, 'Password must be at least 8 digits long').max(50),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);

  try {
    const { data, message } =
      await apiRequest<ApiResponse<AuthResponse>>("auth/register", {
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
    console.error(error.message)
    if(error?.statusCode === 400) throw createError('Missing or Invalid fields')
    throw createError('Internal Server Error');
  }
});