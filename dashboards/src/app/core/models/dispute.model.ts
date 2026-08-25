export type DisputeCategory = 'service_quality' | 'no_show' | 'overcharging' | 'harassment' | 'property_damage' | 'other';
export type DisputePriority = 'low' | 'medium' | 'high' | 'urgent';
export type DisputeStatus = 'open' | 'under_investigation' | 'awaiting_response' | 'resolved' | 'escalated';

export interface Dispute {
  id: string;
  bookingId: string;
  bookingDisplayId: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;
  category: DisputeCategory;
  priority: DisputePriority;
  status: DisputeStatus;
  description: string;
  evidence: { type: string; url: string; uploadedBy: string }[];
  assignedTo?: string;
  assignedToName?: string;
  resolution?: string;
  slaDeadline: string;
  createdAt: string;
  resolvedAt?: string;
}

export const DISPUTE_CATEGORY_LABELS: Record<DisputeCategory, string> = {
  service_quality: 'Service Quality',
  no_show: 'No Show',
  overcharging: 'Overcharging',
  harassment: 'Harassment',
  property_damage: 'Property Damage',
  other: 'Other',
};

export const DISPUTE_PRIORITY_COLORS: Record<DisputePriority, string> = {
  low: 'gray',
  medium: 'amber',
  high: 'orange',
  urgent: 'rose',
};
