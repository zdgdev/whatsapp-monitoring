export enum MessageStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  senderId: string;
  contactId: string;
  status: MessageStatus;
  attachments?: string[];
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
  phone?: string;
}