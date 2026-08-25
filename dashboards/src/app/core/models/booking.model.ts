export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type EscrowStatus = 'funded' | 'held' | 'released' | 'refunded';

export interface Booking {
  id: string;
  displayId: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;
  serviceDescription: string;
  category: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: number;
  status: BookingStatus;
  totalPrice: number;
  escrowStatus: EscrowStatus;
  cancelledBy?: 'client' | 'provider' | 'admin';
  cancelReason?: string;
  disputeId?: string;
  reviewId?: string;
  createdAt: string;
  updatedAt: string;
}

export const BOOKING_STATUS_COLORS: Record<BookingStatus, string> = {
  pending: 'amber',
  confirmed: 'blue',
  completed: 'emerald',
  cancelled: 'rose',
};
