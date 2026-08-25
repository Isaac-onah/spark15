export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  location: string;
  bio: string;
  avatarUrl?: string;
  profileCompleted: boolean;
  status: 'active' | 'suspended' | 'banned';
  suspendedAt?: string;
  suspendedReason?: string;
  joinDate: string;
  lastLoginAt?: string;
  totalBookings: number;
  totalSpent: number;
}
