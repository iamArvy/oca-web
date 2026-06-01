import { UserRole } from "~/enums/roles.enum";

export const USER_ROLE_OPTIONS = [
  { label: "Administrator", value: UserRole.ADMIN },
  { label: "Editor", value: UserRole.EDITOR },
  { label: "User", value: UserRole.USER },
];
