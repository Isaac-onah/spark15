export type TransactionType = 'escrow_fund' | 'escrow_release' | 'refund' | 'platform_fee' | 'payout';
export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'reversed';

export interface Transaction {
  id: string;
  type: TransactionType;
  bookingId: string;
  bookingDisplayId: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  paymentMethod: string;
  initiatedBy: 'system' | 'admin' | 'user';
  timestamp: string;
}

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  escrow_fund: 'Escrow Funded',
  escrow_release: 'Escrow Released',
  refund: 'Refund',
  platform_fee: 'Platform Fee',
  payout: 'Provider Payout',
};
