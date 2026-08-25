export type TicketCategory = 'account' | 'booking' | 'payment' | 'technical' | 'feedback' | 'other';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'waiting_on_user' | 'resolved' | 'closed';

export interface SupportTicket {
  id: string;
  subject: string;
  userId: string;
  userName: string;
  userType: 'client' | 'provider';
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo?: string;
  assignedToName?: string;
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'admin';
  content: string;
  isInternal: boolean;
  timestamp: string;
}

export const TICKET_CATEGORY_LABELS: Record<TicketCategory, string> = {
  account: 'Account Issue',
  booking: 'Booking Problem',
  payment: 'Payment Issue',
  technical: 'Technical Bug',
  feedback: 'Feedback',
  other: 'Other',
};
