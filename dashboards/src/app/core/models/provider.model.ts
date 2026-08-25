export type ServiceCategory = 
  | 'tailoring'
  | 'cooking'
  | 'tutoring'
  | 'it_services'
  | 'translation'
  | 'cleaning'
  | 'beauty_hair'
  | 'handyman'
  | 'childcare'
  | 'music_arts';

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  tailoring: 'Tailoring',
  cooking: 'Cooking & Catering',
  tutoring: 'Tutoring',
  it_services: 'IT Services',
  translation: 'Translation',
  cleaning: 'Cleaning',
  beauty_hair: 'Beauty & Hair',
  handyman: 'Handyman',
  childcare: 'Childcare',
  music_arts: 'Music & Arts',
};

export interface Provider {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: ServiceCategory;
  services: string[];
  description: string;
  hourlyRate: number;
  location: string;
  languages: string[];
  rating: number;
  reviewCount: number;
  avatarUrl?: string;
  isFeatured: boolean;
  isVerified: boolean;
  verificationStatus: 'pending' | 'under_review' | 'approved' | 'rejected' | 'more_info';
  verifiedAt?: string;
  status: 'active' | 'suspended' | 'banned';
  totalBookings: number;
  totalEarned: number;
  completionRate: number;
  avgResponseTime: number;
  joinDate: string;
  availability: string[];
}
