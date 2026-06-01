import type { BaseItem } from "./api-response.interface";

export enum ContactMessageType {
  DISPLAY = 'display',
  SPONSORED = 'sponsored',
  NEWSLETTER = 'newsletter',
  PARTNERSHIP = 'partnership',
  OTHER = 'other',
}

export enum ContactMessageStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  CLOSED = 'closed',
}

export interface ContactMessage extends BaseItem {
  name: string;
  email: string;
  company: string | null;
  type: ContactMessageType;
  message: string;
  status: ContactMessageStatus;
}

// export const ContactMessageTypeOptions = Object.entries(ContactMessageType).map(
//   ([key, value]) => ({
//     label: key.charAt(0) + key.slice(1).toLowerCase(),
//     value,
//   }),
// );

export const ContactMessageStatusOptions = Object.entries(ContactMessageStatus).map(
  ([key, value]) => ({
    label: key.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' '),
    value,
  }),
);
