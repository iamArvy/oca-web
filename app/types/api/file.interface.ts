import type { UploadType } from "~/enums";

export interface FileData {
  url: string;
  name: string;
  type: UploadType;
}
