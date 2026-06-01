import type { UserRole } from "~/enums/roles.enum";
import type { BaseItem } from "./api-response.interface";

export interface UserAdminData extends BaseItem {
  email: string;
  name: string;
  avatar: string | null; 
  role: UserRole;
}

export interface UserWebsiteData extends BaseItem {
  email: string;
  name: string;
  avatar: string | null;
}
