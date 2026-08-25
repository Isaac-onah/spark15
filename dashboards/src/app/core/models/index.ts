export interface AuthUser {
  id: string; email: string; firstName: string; lastName: string; role: 'super_admin' | 'admin' | 'moderator' | 'support_agent'; name: string;
}
export interface User {
  id: string; name: string; email: string; phone?: string; address?: string; neighborhood?: string;
  status: 'active' | 'suspended' | 'banned'; joinDate: string; totalBookings: number; totalSpent: number; profileComplete: boolean;
}
export interface Provider {
  id: string; name: string; email: string; category: string; languages: string[]; hourlyRate: number;
  rating: number; reviewCount: number; verificationStatus: 'verified' | 'pending' | 'unverified';
  status: 'active' | 'suspended' | 'banned'; featured: boolean; joinDate: string;
}
export interface Booking {
  id: string; userId: string; providerId: string; userName: string; providerName: string;
  serviceCategory: string; date: string; price: number; status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  escrowStatus: 'held' | 'released' | 'refunded' | 'none';
}
export interface Transaction {
  id: string; bookingId: string; type: 'escrow_fund' | 'escrow_release' | 'refund' | 'platform_fee' | 'payout';
  amount: number; date: string; status: 'pending' | 'completed' | 'failed';
}
export interface Dispute {
  id: string; bookingId: string; userId: string; providerId: string; category: string;
  priority: 'low' | 'medium' | 'high' | 'critical'; status: 'open' | 'investigating' | 'resolved' | 'escalated';
  assignedTo?: string; slaDeadline: string; createdAt: string;
}
export interface TicketMessage {
  id: string; senderId: string; senderName: string; senderRole: 'user' | 'provider' | 'admin'; content: string; timestamp: string;
}
export interface SupportTicket {
  id: string; userId?: string; providerId?: string; category: string; priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed'; assignedTo?: string; messages: TicketMessage[]; createdAt: string;
}
export interface FlaggedReview {
  id: string; reviewId: string; providerId: string; providerName: string; userId: string; userName: string;
  content: string; flagReason: 'profanity' | 'harassment' | 'spam' | 'suspicious'; status: 'pending' | 'approved' | 'removed'; createdAt: string;
}
export interface AuditLogEntry {
  id: string; adminId: string; adminName: string; adminRole: string; action: string; targetType: string;
  targetId: string; details: string; ipAddress: string; timestamp: string;
}
export interface Category { id: string; name: string; active: boolean; }
export interface Location { id: string; name: string; active: boolean; }
export interface FeatureFlag { key: string; enabled: boolean; description: string; }
export interface PlatformConfig {
  platformName: string; currency: string; defaultLanguage: string; supportedLanguages: string[];
  minHourlyRate: number; maxHourlyRate: number; escrowHoldDurationDays: number; autoCancelTimeoutHours: number;
  profileCompletionRequired: boolean; providerApprovalRequired: boolean; reviewMinLength: number;
  reviewModerationMode: string; platformFeeAmount: number; platformFeeType: string;
  categories: Category[]; locations: Location[]; featureFlags: FeatureFlag[];
}
export interface AppNotification {
  id: string; type: 'verification' | 'dispute' | 'support' | 'escrow' | 'system' | 'sla'; title: string;
  message: string; read: boolean; timestamp: string; link?: string;
}
export interface Broadcast {
  id: string; title: string; message: string; targetAudience: 'all' | 'users' | 'providers'; status: 'draft' | 'sent'; sentAt?: string;
}
export interface ChartData { label: string; value: number; }
