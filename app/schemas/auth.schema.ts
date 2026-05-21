import * as z from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(50),
  email: z.string().email('Email must be a valid email'),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = 
  z.object({
    email: z
      .string()
      .email('Please enter a valid email'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
  });

export type LoginSchema = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = 
  z.object({
    email: z
      .string()
      .email('Please enter a valid email'),
  });

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = 
  z.object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters'),

    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;