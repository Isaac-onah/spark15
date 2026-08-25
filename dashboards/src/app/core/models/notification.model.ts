export type NotificationType = 'verification' | 'dispute' | 'support' | 'escrow' | 'system' | 'sla';

export interface AdminNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface Broadcast {
  id: string;
  title: string;
  message: string;
  targetAudience: 'all' | 'users' | 'providers' | 'custom';
  targetFilters?: Record<string, any>;
  channels: ('in_app' | 'email' | 'sms')[];
  status: 'draft' | 'scheduled' | 'sent';
  scheduledAt?: string;
  sentAt?: string;
  recipientCount?: number;
  createdBy: string;
  createdAt: string;
}
