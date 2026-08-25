export type VerificationStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'more_info';

export interface VerificationDocument {
  type: 'id_photo' | 'membership_card' | 'other';
  url: string;
  uploadedAt: string;
}

export interface VerificationRequest {
  id: string;
  providerId: string;
  providerName: string;
  providerEmail: string;
  category: string;
  status: VerificationStatus;
  documents: VerificationDocument[];
  reviewerId?: string;
  reviewerName?: string;
  reviewNotes?: string;
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
}

export const REJECTION_REASONS = [
  'Blurry document',
  'Expired ID',
  'Name mismatch',
  'Invalid membership card',
  'Suspected fraud',
  'Incomplete documents',
  'Other',
] as const;
