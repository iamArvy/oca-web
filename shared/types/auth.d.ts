// shared/types/auth.d.ts
declare module "#auth-utils" {
  interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: string
  }

  interface UserSession {
    token: string;
  }

  // interface SecureSessionData {
  //   refreshToken: string;
  // }
}

export {};
