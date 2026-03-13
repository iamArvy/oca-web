// shared/types/auth.d.ts
declare module "#auth-utils" {
  interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }

  interface UserSession {
    token: string;
  }

  // interface SecureSessionData {
  //   refreshToken: string;
  // }
}

export {};
