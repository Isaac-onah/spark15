export interface Review {
  id: string;
  bookingId: string;
  bookingDisplayId: string;
  reviewerId: string;
  reviewerName: string;
  providerId: string;
  providerName: string;
  rating: number;
  comment: string;
  isFlagged: boolean;
  flagReason?: string;
  status: 'published' | 'under_review' | 'removed';
  createdAt: string;
}
