import os
import json
import random
from datetime import datetime, timedelta

base_dir = "/Users/isaaconah/Downloads/personal/spark15/refugeeproject/dashboards"

def write_file(path, content):
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w") as f:
        f.write(content.strip() + "\n")

models_ts = """
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
"""
write_file("src/app/core/models/index.ts", models_ts)

auth_ts = """
import { Injectable, signal, computed } from '@angular/core';
import { AuthUser } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'spark15_admin_auth';
  
  private userSignal = signal<AuthUser | null>(this.loadUser());
  currentUser = computed(() => this.userSignal());
  isAuthenticated = computed(() => !!this.userSignal());

  private readonly PERMISSIONS: Record<string, string[]> = {
    super_admin: ['dashboard.view', 'users.manage', 'users.view', 'providers.manage', 'providers.view', 'providers.verify', 'bookings.manage', 'bookings.view', 'financials.view', 'financials.manage', 'moderation.manage', 'moderation.view', 'disputes.manage', 'disputes.view', 'disputes.escalate', 'support.manage', 'support.view', 'config.manage', 'config.view', 'team.manage', 'audit.view', 'legal.manage', 'reports.view', 'reports.export', 'notifications.manage'],
    admin: ['dashboard.view', 'users.manage', 'users.view', 'providers.manage', 'providers.view', 'providers.verify', 'bookings.manage', 'bookings.view', 'financials.view', 'moderation.manage', 'moderation.view', 'disputes.manage', 'disputes.view', 'support.manage', 'support.view', 'reports.view', 'notifications.manage'],
    moderator: ['dashboard.view', 'users.view', 'providers.view', 'providers.verify', 'bookings.view', 'moderation.manage', 'moderation.view', 'disputes.view', 'support.view'],
    support_agent: ['dashboard.view', 'users.view', 'providers.view', 'bookings.view', 'support.manage', 'support.view', 'disputes.view']
  };

  private loadUser(): AuthUser | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  login(email: string, pass: string): boolean {
    let role: AuthUser['role'] | null = null;
    let name = '';
    
    if (email === 'isaaconah6@gmail.com' && pass === 'super123') { role = 'super_admin'; name = 'Isaac Onah'; }
    else if (email === 'admin@spark15.org' && pass === 'admin123') { role = 'admin'; name = 'System Admin'; }
    else if (email === 'mod@spark15.org' && pass === 'mod123') { role = 'moderator'; name = 'Content Moderator'; }
    else if (email === 'support@spark15.org' && pass === 'support123') { role = 'support_agent'; name = 'Support Agent'; }
    
    if (role) {
      const user: AuthUser = { id: Math.random().toString(36).substr(2, 9), email, firstName: name.split(' ')[0], lastName: name.split(' ')[1] || '', role, name };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      this.userSignal.set(user);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.userSignal.set(null);
  }

  getPermissions(): string[] {
    const role = this.userSignal()?.role;
    return role ? this.PERMISSIONS[role] || [] : [];
  }

  hasPermission(permission: string): boolean {
    return this.getPermissions().includes(permission);
  }
}
"""
write_file("src/app/core/services/auth.service.ts", auth_ts)

role_guard_ts = """
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredPermissions = route.data['permissions'] as string[] | undefined;
  
  if (!requiredPermissions || requiredPermissions.length === 0) return true;
  
  const hasAccess = requiredPermissions.some(p => authService.hasPermission(p));
  if (!hasAccess) {
    router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};
"""
write_file("src/app/core/guards/role.guard.ts", role_guard_ts)

auth_guard_ts = """
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) return true;
  
  router.navigate(['/login']);
  return false;
};
"""
write_file("src/app/core/guards/auth-guard.ts", auth_guard_ts)

user_service_ts = """
import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersData: User[] = [
    { id: 'U1', name: 'Hans Müller', email: 'hans.m@example.com', phone: '+49 170 1234567', neighborhood: 'Mitte', status: 'active', joinDate: '2023-01-15', totalBookings: 12, totalSpent: 450, profileComplete: true },
    { id: 'U2', name: 'Amina Al-Fayed', email: 'amina.a@example.com', phone: '+49 152 2345678', neighborhood: 'Kreuzberg', status: 'active', joinDate: '2023-03-22', totalBookings: 8, totalSpent: 200, profileComplete: true },
    { id: 'U3', name: 'Jürgen Schmidt', email: 'j.schmidt@example.com', phone: '+49 171 3456789', neighborhood: 'Neukölln', status: 'suspended', joinDate: '2023-05-10', totalBookings: 3, totalSpent: 75, profileComplete: false },
    { id: 'U4', name: 'Tariq Hassan', email: 'tariq.h@example.com', phone: '+49 160 4567890', neighborhood: 'Friedrichshain', status: 'active', joinDate: '2023-06-05', totalBookings: 25, totalSpent: 1200, profileComplete: true },
    { id: 'U5', name: 'Sabine Meyer', email: 's.meyer@example.com', phone: '+49 172 5678901', neighborhood: 'Prenzlauer Berg', status: 'active', joinDate: '2023-07-18', totalBookings: 1, totalSpent: 30, profileComplete: true },
    { id: 'U6', name: 'Fatima Ahmed', email: 'fatima.ahmed@example.com', phone: '+49 151 6789012', neighborhood: 'Wedding', status: 'banned', joinDate: '2023-08-02', totalBookings: 0, totalSpent: 0, profileComplete: false },
    { id: 'U7', name: 'Michael Weber', email: 'm.weber@example.com', phone: '+49 173 7890123', neighborhood: 'Moabit', status: 'active', joinDate: '2023-09-14', totalBookings: 5, totalSpent: 180, profileComplete: true },
    { id: 'U8', name: 'Zahra Noori', email: 'zahra.n@example.com', phone: '+49 162 8901234', neighborhood: 'Charlottenburg', status: 'active', joinDate: '2023-10-25', totalBookings: 14, totalSpent: 550, profileComplete: true },
    { id: 'U9', name: 'Klaus Wagner', email: 'klaus.w@example.com', phone: '+49 174 9012345', neighborhood: 'Schöneberg', status: 'active', joinDate: '2023-11-08', totalBookings: 2, totalSpent: 50, profileComplete: true },
    { id: 'U10', name: 'Mohammed Ali', email: 'm.ali@example.com', phone: '+49 157 0123456', neighborhood: 'Tempelhof', status: 'active', joinDate: '2023-12-19', totalBookings: 9, totalSpent: 320, profileComplete: true },
    { id: 'U11', name: 'Lukas Becker', email: 'lukas.b@example.com', phone: '+49 175 1234509', neighborhood: 'Mitte', status: 'active', joinDate: '2024-01-05', totalBookings: 4, totalSpent: 110, profileComplete: false },
    { id: 'U12', name: 'Aisha Farah', email: 'aisha.f@example.com', phone: '+49 163 2345098', neighborhood: 'Neukölln', status: 'active', joinDate: '2024-02-12', totalBookings: 7, totalSpent: 260, profileComplete: true }
  ];

  private usersSignal = signal<User[]>(this.usersData);
  users = computed(() => this.usersSignal());

  getUsers() { return this.usersSignal(); }
  getUserById(id: string) { return this.usersSignal().find(u => u.id === id); }
  
  updateUser(id: string, data: Partial<User>) {
    this.usersSignal.update(users => users.map(u => u.id === id ? { ...u, ...data } : u));
  }
  
  suspendUser(id: string, reason?: string) {
    this.updateUser(id, { status: 'suspended' });
  }
  
  banUser(id: string) {
    this.updateUser(id, { status: 'banned' });
  }
  
  deleteUser(id: string) {
    this.usersSignal.update(users => users.filter(u => u.id !== id));
  }
  
  getStats() {
    const users = this.usersSignal();
    return {
      total: users.length,
      active: users.filter(u => u.status === 'active').length,
      suspended: users.filter(u => u.status === 'suspended').length,
      banned: users.filter(u => u.status === 'banned').length
    };
  }
}
"""
write_file("src/app/core/services/user.service.ts", user_service_ts)

provider_service_ts = """
import { Injectable, signal, computed } from '@angular/core';
import { Provider } from '../models';

@Injectable({ providedIn: 'root' })
export class ProviderService {
  private providersData: Provider[] = [
    { id: 'P1', name: 'Fatima S.', email: 'fatima@provider.com', category: 'Tailoring', languages: ['Arabic', 'German'], hourlyRate: 25, rating: 4.8, reviewCount: 34, verificationStatus: 'verified', status: 'active', featured: true, joinDate: '2023-01-20' },
    { id: 'P2', name: 'Ahmad K.', email: 'ahmad@provider.com', category: 'Handyman', languages: ['Farsi', 'German', 'English'], hourlyRate: 35, rating: 4.5, reviewCount: 22, verificationStatus: 'verified', status: 'active', featured: false, joinDate: '2023-02-15' },
    { id: 'P3', name: 'Maryam H.', email: 'maryam@provider.com', category: 'Cooking & Catering', languages: ['Arabic', 'English'], hourlyRate: 40, rating: 4.9, reviewCount: 45, verificationStatus: 'verified', status: 'active', featured: true, joinDate: '2023-03-10' },
    { id: 'P4', name: 'Yonas T.', email: 'yonas@provider.com', category: 'Tutoring', languages: ['Tigrinya', 'German'], hourlyRate: 20, rating: 4.2, reviewCount: 15, verificationStatus: 'pending', status: 'active', featured: false, joinDate: '2023-04-05' },
    { id: 'P5', name: 'Hassan A.', email: 'hassan@provider.com', category: 'IT Services', languages: ['Arabic', 'English', 'German'], hourlyRate: 65, rating: 5.0, reviewCount: 12, verificationStatus: 'verified', status: 'active', featured: false, joinDate: '2023-05-22' },
    { id: 'P6', name: 'Amira B.', email: 'amira@provider.com', category: 'Beauty & Hair', languages: ['Arabic'], hourlyRate: 30, rating: 4.6, reviewCount: 28, verificationStatus: 'verified', status: 'active', featured: true, joinDate: '2023-06-18' },
    { id: 'P7', name: 'Dawit M.', email: 'dawit@provider.com', category: 'Cleaning', languages: ['Tigrinya', 'English'], hourlyRate: 15, rating: 4.1, reviewCount: 8, verificationStatus: 'unverified', status: 'active', featured: false, joinDate: '2023-07-12' },
    { id: 'P8', name: 'Zahra R.', email: 'zahra@provider.com', category: 'Translation', languages: ['Farsi', 'German'], hourlyRate: 45, rating: 4.7, reviewCount: 31, verificationStatus: 'verified', status: 'active', featured: false, joinDate: '2023-08-30' },
    { id: 'P9', name: 'Omar J.', email: 'omar@provider.com', category: 'Handyman', languages: ['Somali', 'German'], hourlyRate: 28, rating: 3.8, reviewCount: 5, verificationStatus: 'pending', status: 'suspended', featured: false, joinDate: '2023-09-14' },
    { id: 'P10', name: 'Leila N.', email: 'leila@provider.com', category: 'Childcare', languages: ['Arabic', 'French', 'German'], hourlyRate: 22, rating: 4.9, reviewCount: 40, verificationStatus: 'verified', status: 'active', featured: true, joinDate: '2023-10-01' },
    { id: 'P11', name: 'Rashid D.', email: 'rashid@provider.com', category: 'Music & Arts', languages: ['Arabic', 'English'], hourlyRate: 50, rating: 4.4, reviewCount: 10, verificationStatus: 'unverified', status: 'active', featured: false, joinDate: '2023-11-20' }
  ];

  private providersSignal = signal<Provider[]>(this.providersData);
  providers = computed(() => this.providersSignal());

  getProviders() { return this.providersSignal(); }
  getProviderById(id: string) { return this.providersSignal().find(p => p.id === id); }
  
  updateProvider(id: string, data: Partial<Provider>) {
    this.providersSignal.update(providers => providers.map(p => p.id === id ? { ...p, ...data } : p));
  }
  
  toggleFeatured(id: string) {
    const p = this.getProviderById(id);
    if(p) this.updateProvider(id, { featured: !p.featured });
  }
  
  suspendProvider(id: string) {
    this.updateProvider(id, { status: 'suspended' });
  }
  
  getByCategory(category: string) {
    return this.providersSignal().filter(p => p.category === category);
  }
  
  getStats() {
    const providers = this.providersSignal();
    return {
      total: providers.length,
      verified: providers.filter(p => p.verificationStatus === 'verified').length,
      pending: providers.filter(p => p.verificationStatus === 'pending').length,
      active: providers.filter(p => p.status === 'active').length,
      avgRating: providers.reduce((acc, p) => acc + p.rating, 0) / providers.length
    };
  }
}
"""
write_file("src/app/core/services/provider.service.ts", provider_service_ts)

booking_service_ts = """
import { Injectable, signal, computed } from '@angular/core';
import { Booking } from '../models';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bookingsData: Booking[] = [
    { id: 'B-1001', userId: 'U1', providerId: 'P1', userName: 'Hans Müller', providerName: 'Fatima S.', serviceCategory: 'Tailoring', date: '2024-03-01T10:00:00Z', price: 75, status: 'completed', escrowStatus: 'released' },
    { id: 'B-1002', userId: 'U2', providerId: 'P2', userName: 'Amina Al-Fayed', providerName: 'Ahmad K.', serviceCategory: 'Handyman', date: '2024-03-05T14:00:00Z', price: 105, status: 'completed', escrowStatus: 'released' },
    { id: 'B-1003', userId: 'U3', providerId: 'P3', userName: 'Jürgen Schmidt', providerName: 'Maryam H.', serviceCategory: 'Cooking & Catering', date: '2024-03-10T18:00:00Z', price: 200, status: 'cancelled', escrowStatus: 'refunded' },
    { id: 'B-1004', userId: 'U4', providerId: 'P5', userName: 'Tariq Hassan', providerName: 'Hassan A.', serviceCategory: 'IT Services', date: '2024-03-15T09:00:00Z', price: 130, status: 'completed', escrowStatus: 'released' },
    { id: 'B-1005', userId: 'U5', providerId: 'P6', userName: 'Sabine Meyer', providerName: 'Amira B.', serviceCategory: 'Beauty & Hair', date: '2024-03-20T11:30:00Z', price: 60, status: 'pending', escrowStatus: 'held' },
    { id: 'B-1006', userId: 'U7', providerId: 'P8', userName: 'Michael Weber', providerName: 'Zahra R.', serviceCategory: 'Translation', date: '2024-03-25T15:00:00Z', price: 90, status: 'confirmed', escrowStatus: 'held' },
    { id: 'B-1007', userId: 'U8', providerId: 'P10', userName: 'Zahra Noori', providerName: 'Leila N.', serviceCategory: 'Childcare', date: '2024-03-28T08:00:00Z', price: 110, status: 'completed', escrowStatus: 'released' },
    { id: 'B-1008', userId: 'U10', providerId: 'P1', userName: 'Mohammed Ali', providerName: 'Fatima S.', serviceCategory: 'Tailoring', date: '2024-04-02T13:00:00Z', price: 50, status: 'confirmed', escrowStatus: 'held' },
    { id: 'B-1009', userId: 'U12', providerId: 'P4', userName: 'Aisha Farah', providerName: 'Yonas T.', serviceCategory: 'Tutoring', date: '2024-04-05T16:00:00Z', price: 40, status: 'pending', escrowStatus: 'held' },
    { id: 'B-1010', userId: 'U1', providerId: 'P2', userName: 'Hans Müller', providerName: 'Ahmad K.', serviceCategory: 'Handyman', date: '2024-04-10T10:00:00Z', price: 70, status: 'cancelled', escrowStatus: 'refunded' },
    { id: 'B-1011', userId: 'U2', providerId: 'P7', userName: 'Amina Al-Fayed', providerName: 'Dawit M.', serviceCategory: 'Cleaning', date: '2024-04-12T09:00:00Z', price: 45, status: 'completed', escrowStatus: 'released' },
    { id: 'B-1012', userId: 'U4', providerId: 'P11', userName: 'Tariq Hassan', providerName: 'Rashid D.', serviceCategory: 'Music & Arts', date: '2024-04-15T17:00:00Z', price: 150, status: 'confirmed', escrowStatus: 'held' },
    { id: 'B-1013', userId: 'U7', providerId: 'P3', userName: 'Michael Weber', providerName: 'Maryam H.', serviceCategory: 'Cooking & Catering', date: '2024-04-18T19:00:00Z', price: 180, status: 'pending', escrowStatus: 'held' },
    { id: 'B-1014', userId: 'U8', providerId: 'P5', userName: 'Zahra Noori', providerName: 'Hassan A.', serviceCategory: 'IT Services', date: '2024-04-22T11:00:00Z', price: 195, status: 'completed', escrowStatus: 'released' },
    { id: 'B-1015', userId: 'U11', providerId: 'P9', userName: 'Lukas Becker', providerName: 'Omar J.', serviceCategory: 'Handyman', date: '2024-04-25T14:30:00Z', price: 56, status: 'pending', escrowStatus: 'held' }
  ];

  private bookingsSignal = signal<Booking[]>(this.bookingsData);
  bookings = computed(() => this.bookingsSignal());

  getBookings() { return this.bookingsSignal(); }
  getBookingById(id: string) { return this.bookingsSignal().find(b => b.id === id); }
  getBookingsByUser(userId: string) { return this.bookingsSignal().filter(b => b.userId === userId); }
  getBookingsByProvider(providerId: string) { return this.bookingsSignal().filter(b => b.providerId === providerId); }
  
  updateStatus(id: string, status: Booking['status'], reason?: string) {
    this.bookingsSignal.update(bookings => bookings.map(b => b.id === id ? { ...b, status } : b));
  }
  
  getStats() {
    const bookings = this.bookingsSignal();
    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      totalVolume: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0)
    };
  }
}
"""
write_file("src/app/core/services/booking.service.ts", booking_service_ts)

financial_service_ts = """
import { Injectable, signal, computed } from '@angular/core';
import { Transaction } from '../models';

@Injectable({ providedIn: 'root' })
export class FinancialService {
  private txData: Transaction[] = [
    { id: 'TX-101', bookingId: 'B-1001', type: 'escrow_fund', amount: 75, date: '2024-02-28T10:00:00Z', status: 'completed' },
    { id: 'TX-102', bookingId: 'B-1001', type: 'platform_fee', amount: 3.75, date: '2024-03-01T11:00:00Z', status: 'completed' },
    { id: 'TX-103', bookingId: 'B-1001', type: 'escrow_release', amount: 71.25, date: '2024-03-01T11:05:00Z', status: 'completed' },
    { id: 'TX-104', bookingId: 'B-1001', type: 'payout', amount: 71.25, date: '2024-03-02T09:00:00Z', status: 'completed' },
    
    { id: 'TX-105', bookingId: 'B-1002', type: 'escrow_fund', amount: 105, date: '2024-03-03T14:00:00Z', status: 'completed' },
    { id: 'TX-106', bookingId: 'B-1002', type: 'platform_fee', amount: 5.25, date: '2024-03-05T15:00:00Z', status: 'completed' },
    { id: 'TX-107', bookingId: 'B-1002', type: 'escrow_release', amount: 99.75, date: '2024-03-05T15:05:00Z', status: 'completed' },
    { id: 'TX-108', bookingId: 'B-1002', type: 'payout', amount: 99.75, date: '2024-03-06T09:00:00Z', status: 'pending' },
    
    { id: 'TX-109', bookingId: 'B-1003', type: 'escrow_fund', amount: 200, date: '2024-03-08T18:00:00Z', status: 'completed' },
    { id: 'TX-110', bookingId: 'B-1003', type: 'refund', amount: 200, date: '2024-03-11T10:00:00Z', status: 'completed' },
    
    { id: 'TX-111', bookingId: 'B-1004', type: 'escrow_fund', amount: 130, date: '2024-03-12T09:00:00Z', status: 'completed' },
    { id: 'TX-112', bookingId: 'B-1004', type: 'platform_fee', amount: 6.5, date: '2024-03-15T10:00:00Z', status: 'completed' },
    { id: 'TX-113', bookingId: 'B-1004', type: 'escrow_release', amount: 123.5, date: '2024-03-15T10:05:00Z', status: 'completed' },
    
    { id: 'TX-114', bookingId: 'B-1005', type: 'escrow_fund', amount: 60, date: '2024-03-18T11:30:00Z', status: 'completed' },
    { id: 'TX-115', bookingId: 'B-1006', type: 'escrow_fund', amount: 90, date: '2024-03-23T15:00:00Z', status: 'completed' },
    { id: 'TX-116', bookingId: 'B-1007', type: 'escrow_fund', amount: 110, date: '2024-03-26T08:00:00Z', status: 'completed' },
    { id: 'TX-117', bookingId: 'B-1007', type: 'platform_fee', amount: 5.5, date: '2024-03-28T09:00:00Z', status: 'completed' },
    { id: 'TX-118', bookingId: 'B-1007', type: 'escrow_release', amount: 104.5, date: '2024-03-28T09:05:00Z', status: 'completed' },
    
    { id: 'TX-119', bookingId: 'B-1008', type: 'escrow_fund', amount: 50, date: '2024-03-31T13:00:00Z', status: 'completed' },
    { id: 'TX-120', bookingId: 'B-1009', type: 'escrow_fund', amount: 40, date: '2024-04-03T16:00:00Z', status: 'completed' },
    { id: 'TX-121', bookingId: 'B-1011', type: 'escrow_fund', amount: 45, date: '2024-04-10T09:00:00Z', status: 'completed' },
    { id: 'TX-122', bookingId: 'B-1011', type: 'platform_fee', amount: 2.25, date: '2024-04-12T10:00:00Z', status: 'completed' },
    { id: 'TX-123', bookingId: 'B-1011', type: 'escrow_release', amount: 42.75, date: '2024-04-12T10:05:00Z', status: 'completed' },
    { id: 'TX-124', bookingId: 'B-1014', type: 'escrow_fund', amount: 195, date: '2024-04-20T11:00:00Z', status: 'completed' }
  ];

  private txSignal = signal<Transaction[]>(this.txData);

  getTransactions() { return this.txSignal(); }
  getTransactionsByBooking(bookingId: string) { return this.txSignal().filter(t => t.bookingId === bookingId); }
  
  getEscrowBalance() {
    const txs = this.txSignal();
    const funded = txs.filter(t => t.type === 'escrow_fund' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
    const released = txs.filter(t => t.type === 'escrow_release' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
    const refunded = txs.filter(t => t.type === 'refund' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
    return funded - released - refunded;
  }
  
  getPendingPayouts() {
    return this.txSignal().filter(t => t.type === 'payout' && t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);
  }
  
  getTotalRevenue() {
    return this.txSignal().filter(t => t.type === 'platform_fee' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  }
  
  getPlatformFees() {
    return this.getTotalRevenue();
  }
  
  getFinancialStats() {
    const txs = this.txSignal();
    const totalEscrowBalance = this.getEscrowBalance();
    const platformFees = this.getPlatformFees();
    const pendingPayouts = this.getPendingPayouts();
    const totalRefunds = txs.filter(t => t.type === 'refund' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
    
    return {
      totalEscrowBalance,
      totalRevenue: platformFees,
      platformFees,
      pendingPayouts,
      totalRefunds,
      netRevenue: platformFees
    };
  }
}
"""
write_file("src/app/core/services/financial.service.ts", financial_service_ts)

dispute_service_ts = """
import { Injectable, signal, computed } from '@angular/core';
import { Dispute } from '../models';

@Injectable({ providedIn: 'root' })
export class DisputeService {
  private disputesData: Dispute[] = [
    { id: 'D-101', bookingId: 'B-1003', userId: 'U3', providerId: 'P3', category: 'No Show', priority: 'high', status: 'resolved', slaDeadline: '2024-03-12T18:00:00Z', createdAt: '2024-03-10T19:00:00Z' },
    { id: 'D-102', bookingId: 'B-1005', userId: 'U5', providerId: 'P6', category: 'Quality of Service', priority: 'medium', status: 'investigating', assignedTo: 'admin@spark15.org', slaDeadline: '2024-03-22T11:30:00Z', createdAt: '2024-03-20T12:00:00Z' },
    { id: 'D-103', bookingId: 'B-1010', userId: 'U1', providerId: 'P2', category: 'Late Cancellation', priority: 'medium', status: 'resolved', slaDeadline: '2024-04-12T10:00:00Z', createdAt: '2024-04-10T11:00:00Z' },
    { id: 'D-104', bookingId: 'B-1013', userId: 'U7', providerId: 'P3', category: 'Payment Issue', priority: 'critical', status: 'escalated', slaDeadline: '2024-04-19T19:00:00Z', createdAt: '2024-04-18T20:00:00Z' },
    { id: 'D-105', bookingId: 'B-1008', userId: 'U10', providerId: 'P1', category: 'Unprofessional Behavior', priority: 'high', status: 'open', slaDeadline: '2024-04-04T13:00:00Z', createdAt: '2024-04-02T14:00:00Z' },
    { id: 'D-106', bookingId: 'B-1015', userId: 'U11', providerId: 'P9', category: 'No Show', priority: 'high', status: 'open', slaDeadline: '2024-04-27T14:30:00Z', createdAt: '2024-04-25T15:00:00Z' },
    { id: 'D-107', bookingId: 'B-1006', userId: 'U7', providerId: 'P8', category: 'Other', priority: 'low', status: 'investigating', assignedTo: 'mod@spark15.org', slaDeadline: '2024-03-27T15:00:00Z', createdAt: '2024-03-25T16:00:00Z' }
  ];

  private disputesSignal = signal<Dispute[]>(this.disputesData);

  getDisputes() { return this.disputesSignal(); }
  getDisputeById(id: string) { return this.disputesSignal().find(d => d.id === id); }
  
  updateStatus(id: string, status: Dispute['status']) {
    this.disputesSignal.update(ds => ds.map(d => d.id === id ? { ...d, status } : d));
  }
  
  assignTo(id: string, adminId: string) {
    this.disputesSignal.update(ds => ds.map(d => d.id === id ? { ...d, assignedTo: adminId } : d));
  }
  
  resolve(id: string, resolution: string) {
    this.updateStatus(id, 'resolved');
  }
  
  escalate(id: string) {
    this.updateStatus(id, 'escalated');
  }
  
  getStats() {
    const ds = this.disputesSignal();
    return {
      total: ds.length,
      open: ds.filter(d => d.status === 'open').length,
      investigating: ds.filter(d => d.status === 'investigating').length,
      resolved: ds.filter(d => d.status === 'resolved').length,
      escalated: ds.filter(d => d.status === 'escalated').length
    };
  }
}
"""
write_file("src/app/core/services/dispute.service.ts", dispute_service_ts)

support_ticket_service_ts = """
import { Injectable, signal, computed } from '@angular/core';
import { SupportTicket, TicketMessage } from '../models';

@Injectable({ providedIn: 'root' })
export class SupportTicketService {
  private ticketsData: SupportTicket[] = [
    { id: 'T-201', userId: 'U1', category: 'Account Access', priority: 'high', status: 'resolved', createdAt: '2024-03-01T09:00:00Z', messages: [
        { id: 'M-1', senderId: 'U1', senderName: 'Hans Müller', senderRole: 'user', content: 'I cannot login to my account.', timestamp: '2024-03-01T09:00:00Z' },
        { id: 'M-2', senderId: 'admin1', senderName: 'Support Agent', senderRole: 'admin', content: 'Reset your password using the link sent.', timestamp: '2024-03-01T09:15:00Z' }
    ]},
    { id: 'T-202', providerId: 'P4', category: 'Verification', priority: 'medium', status: 'in_progress', assignedTo: 'mod@spark15.org', createdAt: '2024-03-10T14:00:00Z', messages: [
        { id: 'M-3', senderId: 'P4', senderName: 'Yonas T.', senderRole: 'provider', content: 'My ID verification is still pending.', timestamp: '2024-03-10T14:00:00Z' },
        { id: 'M-4', senderId: 'admin2', senderName: 'Content Moderator', senderRole: 'admin', content: 'We are reviewing it now. Please provide clear photos.', timestamp: '2024-03-11T10:00:00Z' }
    ]},
    { id: 'T-203', userId: 'U6', category: 'Billing', priority: 'critical', status: 'open', createdAt: '2024-03-15T11:00:00Z', messages: [
        { id: 'M-5', senderId: 'U6', senderName: 'Fatima Ahmed', senderRole: 'user', content: 'I was double charged!', timestamp: '2024-03-15T11:00:00Z' }
    ]},
    { id: 'T-204', providerId: 'P9', category: 'Platform Bug', priority: 'low', status: 'closed', createdAt: '2024-03-20T16:00:00Z', messages: [
        { id: 'M-6', senderId: 'P9', senderName: 'Omar J.', senderRole: 'provider', content: 'The calendar sync is not working.', timestamp: '2024-03-20T16:00:00Z' }
    ]},
    { id: 'T-205', userId: 'U11', category: 'Feedback', priority: 'low', status: 'open', createdAt: '2024-03-22T08:00:00Z', messages: [
        { id: 'M-7', senderId: 'U11', senderName: 'Lukas Becker', senderRole: 'user', content: 'Great app, but needs dark mode.', timestamp: '2024-03-22T08:00:00Z' }
    ]},
    { id: 'T-206', providerId: 'P2', category: 'Account Updates', priority: 'medium', status: 'resolved', createdAt: '2024-03-25T13:00:00Z', messages: [
        { id: 'M-8', senderId: 'P2', senderName: 'Ahmad K.', senderRole: 'provider', content: 'How do I change my phone number?', timestamp: '2024-03-25T13:00:00Z' },
        { id: 'M-9', senderId: 'admin1', senderName: 'Support Agent', senderRole: 'admin', content: 'Go to Settings > Profile.', timestamp: '2024-03-25T13:10:00Z' },
        { id: 'M-10', senderId: 'P2', senderName: 'Ahmad K.', senderRole: 'provider', content: 'Thanks, got it!', timestamp: '2024-03-25T13:20:00Z' }
    ]},
    { id: 'T-207', userId: 'U8', category: 'Report User/Provider', priority: 'high', status: 'in_progress', assignedTo: 'admin@spark15.org', createdAt: '2024-04-01T10:00:00Z', messages: [
        { id: 'M-11', senderId: 'U8', senderName: 'Zahra Noori', senderRole: 'user', content: 'Provider P7 was very rude.', timestamp: '2024-04-01T10:00:00Z' },
        { id: 'M-12', senderId: 'admin3', senderName: 'System Admin', senderRole: 'admin', content: 'We take this seriously. Investigating now.', timestamp: '2024-04-01T10:30:00Z' }
    ]},
    { id: 'T-208', providerId: 'P10', category: 'Payment Issue', priority: 'high', status: 'open', createdAt: '2024-04-05T09:00:00Z', messages: [
        { id: 'M-13', senderId: 'P10', senderName: 'Leila N.', senderRole: 'provider', content: 'My payout from last week has not arrived.', timestamp: '2024-04-05T09:00:00Z' }
    ]}
  ];

  private ticketsSignal = signal<SupportTicket[]>(this.ticketsData);

  getTickets() { return this.ticketsSignal(); }
  getTicketById(id: string) { return this.ticketsSignal().find(t => t.id === id); }
  
  addMessage(ticketId: string, message: Omit<TicketMessage, 'id' | 'timestamp'>) {
    this.ticketsSignal.update(ts => ts.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          messages: [...t.messages, { ...message, id: 'M-' + Math.random(), timestamp: new Date().toISOString() }]
        };
      }
      return t;
    }));
  }
  
  updateStatus(ticketId: string, status: SupportTicket['status']) {
    this.ticketsSignal.update(ts => ts.map(t => t.id === ticketId ? { ...t, status } : t));
  }
  
  assignTo(ticketId: string, adminId: string) {
    this.ticketsSignal.update(ts => ts.map(t => t.id === ticketId ? { ...t, assignedTo: adminId } : t));
  }
  
  getStats() {
    const ts = this.ticketsSignal();
    return {
      total: ts.length,
      open: ts.filter(t => t.status === 'open').length,
      inProgress: ts.filter(t => t.status === 'in_progress').length,
      resolved: ts.filter(t => t.status === 'resolved').length,
      closed: ts.filter(t => t.status === 'closed').length
    };
  }
}
"""
write_file("src/app/core/services/support-ticket.service.ts", support_ticket_service_ts)

moderation_service_ts = """
import { Injectable, signal, computed } from '@angular/core';
import { FlaggedReview } from '../models';

@Injectable({ providedIn: 'root' })
export class ModerationService {
  private flaggedReviewsData: FlaggedReview[] = [
    { id: 'F-301', reviewId: 'R-1', providerId: 'P2', providerName: 'Ahmad K.', userId: 'U1', userName: 'Hans Müller', content: 'Terrible service, completely useless! *@$#', flagReason: 'profanity', status: 'pending', createdAt: '2024-03-05T10:00:00Z' },
    { id: 'F-302', reviewId: 'R-2', providerId: 'P5', providerName: 'Hassan A.', userId: 'U6', userName: 'Fatima Ahmed', content: 'Click here to make easy money: http://spam.link', flagReason: 'spam', status: 'removed', createdAt: '2024-03-10T12:00:00Z' },
    { id: 'F-303', reviewId: 'R-3', providerId: 'P7', providerName: 'Dawit M.', userId: 'U8', userName: 'Zahra Noori', content: 'He was very rude and made inappropriate comments.', flagReason: 'harassment', status: 'pending', createdAt: '2024-03-15T14:00:00Z' },
    { id: 'F-304', reviewId: 'R-4', providerId: 'P9', providerName: 'Omar J.', userId: 'U4', userName: 'Tariq Hassan', content: 'I think this account is a bot.', flagReason: 'suspicious', status: 'approved', createdAt: '2024-03-20T16:00:00Z' },
    { id: 'F-305', reviewId: 'R-5', providerId: 'P1', providerName: 'Fatima S.', userId: 'U3', userName: 'Jürgen Schmidt', content: 'Fake reviews here, do not trust!', flagReason: 'suspicious', status: 'pending', createdAt: '2024-03-25T09:00:00Z' },
    { id: 'F-306', reviewId: 'R-6', providerId: 'P4', providerName: 'Yonas T.', userId: 'U11', userName: 'Lukas Becker', content: 'Buy cheap cryptos now!', flagReason: 'spam', status: 'pending', createdAt: '2024-04-01T11:00:00Z' },
    { id: 'F-307', reviewId: 'R-7', providerId: 'P6', providerName: 'Amira B.', userId: 'U2', userName: 'Amina Al-Fayed', content: 'She ruined my hair, absolutely terrible idiot.', flagReason: 'profanity', status: 'pending', createdAt: '2024-04-05T13:00:00Z' },
    { id: 'F-308', reviewId: 'R-8', providerId: 'P11', providerName: 'Rashid D.', userId: 'U10', userName: 'Mohammed Ali', content: 'Scammer alert!!!', flagReason: 'harassment', status: 'pending', createdAt: '2024-04-10T15:00:00Z' }
  ];

  private flaggedSignal = signal<FlaggedReview[]>(this.flaggedReviewsData);

  getFlaggedReviews() { return this.flaggedSignal(); }
  getAllReviews() { return []; }
  getFlaggedChats() { return []; }
  getFlaggedProfiles() { return []; }

  approveReview(id: string) {
    this.flaggedSignal.update(fs => fs.map(f => f.id === id ? { ...f, status: 'approved' } : f));
  }
  
  removeReview(id: string) {
    this.flaggedSignal.update(fs => fs.map(f => f.id === id ? { ...f, status: 'removed' } : f));
  }
  
  getStats() {
    const fs = this.flaggedSignal();
    return {
      totalFlagged: fs.length,
      pending: fs.filter(f => f.status === 'pending').length,
      removed: fs.filter(f => f.status === 'removed').length,
      approved: fs.filter(f => f.status === 'approved').length
    };
  }
}
"""
write_file("src/app/core/services/moderation.service.ts", moderation_service_ts)

audit_log_service_ts = """
import { Injectable, signal, computed } from '@angular/core';
import { AuditLogEntry } from '../models';

@Injectable({ providedIn: 'root' })
export class AuditLogService {
  private logsData: AuditLogEntry[] = [
    { id: 'A-401', adminId: 'admin@spark15.org', adminName: 'System Admin', adminRole: 'admin', action: 'user.suspend', targetType: 'User', targetId: 'U3', details: 'Suspended for policy violation', ipAddress: '192.168.1.1', timestamp: '2024-03-01T10:00:00Z' },
    { id: 'A-402', adminId: 'mod@spark15.org', adminName: 'Content Moderator', adminRole: 'moderator', action: 'provider.approve', targetType: 'Provider', targetId: 'P1', details: 'Verified documents', ipAddress: '192.168.1.2', timestamp: '2024-03-02T11:00:00Z' },
    { id: 'A-403', adminId: 'admin@spark15.org', adminName: 'System Admin', adminRole: 'admin', action: 'config.update', targetType: 'PlatformConfig', targetId: 'Global', details: 'Updated platform fee to 1.5%', ipAddress: '192.168.1.1', timestamp: '2024-03-05T09:00:00Z' },
    { id: 'A-404', adminId: 'support@spark15.org', adminName: 'Support Agent', adminRole: 'support_agent', action: 'booking.cancel', targetType: 'Booking', targetId: 'B-1003', details: 'Cancelled per user request', ipAddress: '192.168.1.3', timestamp: '2024-03-10T14:00:00Z' },
    { id: 'A-405', adminId: 'super@spark15.org', adminName: 'Isaac Onah', adminRole: 'super_admin', action: 'role.update', targetType: 'Admin', targetId: 'mod@spark15.org', details: 'Granted moderation.manage permission', ipAddress: '10.0.0.1', timestamp: '2024-03-12T16:00:00Z' },
    { id: 'A-406', adminId: 'mod@spark15.org', adminName: 'Content Moderator', adminRole: 'moderator', action: 'review.remove', targetType: 'Review', targetId: 'R-2', details: 'Removed spam review', ipAddress: '192.168.1.2', timestamp: '2024-03-15T12:00:00Z' },
    { id: 'A-407', adminId: 'admin@spark15.org', adminName: 'System Admin', adminRole: 'admin', action: 'escrow.release', targetType: 'Transaction', targetId: 'TX-103', details: 'Manually released funds', ipAddress: '192.168.1.1', timestamp: '2024-03-18T10:00:00Z' },
    { id: 'A-408', adminId: 'support@spark15.org', adminName: 'Support Agent', adminRole: 'support_agent', action: 'ticket.resolve', targetType: 'SupportTicket', targetId: 'T-201', details: 'Resolved account access issue', ipAddress: '192.168.1.3', timestamp: '2024-03-20T09:00:00Z' },
    { id: 'A-409', adminId: 'admin@spark15.org', adminName: 'System Admin', adminRole: 'admin', action: 'user.ban', targetType: 'User', targetId: 'U6', details: 'Banned for repeated violations', ipAddress: '192.168.1.1', timestamp: '2024-03-22T14:00:00Z' },
    { id: 'A-410', adminId: 'mod@spark15.org', adminName: 'Content Moderator', adminRole: 'moderator', action: 'provider.reject', targetType: 'Provider', targetId: 'P7', details: 'Rejected fake ID', ipAddress: '192.168.1.2', timestamp: '2024-03-25T11:00:00Z' },
    { id: 'A-411', adminId: 'support@spark15.org', adminName: 'Support Agent', adminRole: 'support_agent', action: 'dispute.assign', targetType: 'Dispute', targetId: 'D-102', details: 'Assigned to admin', ipAddress: '192.168.1.3', timestamp: '2024-03-28T15:00:00Z' },
    { id: 'A-412', adminId: 'admin@spark15.org', adminName: 'System Admin', adminRole: 'admin', action: 'dispute.resolve', targetType: 'Dispute', targetId: 'D-101', details: 'Resolved no show dispute', ipAddress: '192.168.1.1', timestamp: '2024-04-01T10:00:00Z' },
    { id: 'A-413', adminId: 'super@spark15.org', adminName: 'Isaac Onah', adminRole: 'super_admin', action: 'feature.toggle', targetType: 'PlatformConfig', targetId: 'enable_crypto', details: 'Disabled crypto payments', ipAddress: '10.0.0.1', timestamp: '2024-04-05T16:00:00Z' },
    { id: 'A-414', adminId: 'mod@spark15.org', adminName: 'Content Moderator', adminRole: 'moderator', action: 'review.approve', targetType: 'Review', targetId: 'R-4', details: 'Approved after manual review', ipAddress: '192.168.1.2', timestamp: '2024-04-10T12:00:00Z' },
    { id: 'A-415', adminId: 'support@spark15.org', adminName: 'Support Agent', adminRole: 'support_agent', action: 'ticket.create', targetType: 'SupportTicket', targetId: 'T-208', details: 'Created ticket on behalf of provider', ipAddress: '192.168.1.3', timestamp: '2024-04-15T09:00:00Z' }
  ];

  private logsSignal = signal<AuditLogEntry[]>(this.logsData);

  getEntries() { return this.logsSignal(); }
  getEntriesByAdmin(adminId: string) { return this.logsSignal().filter(l => l.adminId === adminId); }
  getEntriesByTarget(targetType: string, targetId: string) { return this.logsSignal().filter(l => l.targetType === targetType && l.targetId === targetId); }
  
  exportEntries() {
    return 'CSV_DATA_HERE';
  }
}
"""
write_file("src/app/core/services/audit-log.service.ts", audit_log_service_ts)

platform_config_service_ts = """
import { Injectable, signal, computed } from '@angular/core';
import { PlatformConfig, Category, Location, FeatureFlag } from '../models';

@Injectable({ providedIn: 'root' })
export class PlatformConfigService {
  private initialConfig: PlatformConfig = {
    platformName: 'Spark 15',
    currency: 'EUR',
    defaultLanguage: 'de',
    supportedLanguages: ['de', 'en', 'ar', 'ti', 'fa', 'so'],
    minHourlyRate: 10,
    maxHourlyRate: 100,
    escrowHoldDurationDays: 14,
    autoCancelTimeoutHours: 48,
    profileCompletionRequired: true,
    providerApprovalRequired: true,
    reviewMinLength: 20,
    reviewModerationMode: 'auto_flag',
    platformFeeAmount: 1,
    platformFeeType: 'flat',
    categories: [
      { id: 'C1', name: 'Tailoring', active: true },
      { id: 'C2', name: 'Cooking & Catering', active: true },
      { id: 'C3', name: 'Tutoring', active: true },
      { id: 'C4', name: 'IT Services', active: true },
      { id: 'C5', name: 'Translation', active: true },
      { id: 'C6', name: 'Cleaning', active: true },
      { id: 'C7', name: 'Beauty & Hair', active: true },
      { id: 'C8', name: 'Handyman', active: true },
      { id: 'C9', name: 'Childcare', active: true },
      { id: 'C10', name: 'Music & Arts', active: true }
    ],
    locations: [
      { id: 'L1', name: 'Mitte', active: true },
      { id: 'L2', name: 'Kreuzberg', active: true },
      { id: 'L3', name: 'Neukölln', active: true },
      { id: 'L4', name: 'Friedrichshain', active: true },
      { id: 'L5', name: 'Prenzlauer Berg', active: true },
      { id: 'L6', name: 'Wedding', active: true },
      { id: 'L7', name: 'Moabit', active: true },
      { id: 'L8', name: 'Charlottenburg', active: true },
      { id: 'L9', name: 'Schöneberg', active: true },
      { id: 'L10', name: 'Tempelhof', active: true }
    ],
    featureFlags: [
      { key: 'enable_escrow', enabled: true, description: 'Enable escrow payments' },
      { key: 'enable_crypto', enabled: false, description: 'Enable crypto payments' },
      { key: 'auto_approve_providers', enabled: false, description: 'Auto-approve new providers' },
      { key: 'show_provider_ratings', enabled: true, description: 'Show ratings on provider profiles' },
      { key: 'enable_disputes', enabled: true, description: 'Enable dispute resolution center' },
      { key: 'maintenance_mode', enabled: false, description: 'Put platform in maintenance mode' },
      { key: 'beta_features', enabled: false, description: 'Enable beta features for admins' }
    ]
  };

  private configSignal = signal<PlatformConfig>(this.initialConfig);
  config = computed(() => this.configSignal());

  getConfig() { return this.configSignal(); }
  
  updateConfig(partial: Partial<PlatformConfig>) {
    this.configSignal.update(c => ({ ...c, ...partial }));
  }
  
  getCategories() { return this.configSignal().categories; }
  updateCategory(id: string, data: Partial<Category>) {
    this.configSignal.update(c => ({
      ...c,
      categories: c.categories.map(cat => cat.id === id ? { ...cat, ...data } : cat)
    }));
  }
  
  getLocations() { return this.configSignal().locations; }
  
  getFeatureFlags() { return this.configSignal().featureFlags; }
  toggleFeatureFlag(key: string) {
    this.configSignal.update(c => ({
      ...c,
      featureFlags: c.featureFlags.map(f => f.key === key ? { ...f, enabled: !f.enabled } : f)
    }));
  }
}
"""
write_file("src/app/core/services/platform-config.service.ts", platform_config_service_ts)

notification_service_ts = """
import { Injectable, signal, computed } from '@angular/core';
import { AppNotification, Broadcast } from '../models';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationsData: AppNotification[] = [
    { id: 'N-501', type: 'verification', title: 'New Provider Verification', message: 'Provider P4 submitted documents for verification.', read: false, timestamp: '2024-04-10T10:00:00Z', link: '/providers/P4' },
    { id: 'N-502', type: 'dispute', title: 'Dispute Escalated', message: 'Dispute D-104 has been escalated to critical.', read: false, timestamp: '2024-04-11T14:30:00Z', link: '/disputes/D-104' },
    { id: 'N-503', type: 'support', title: 'New Support Ticket', message: 'Ticket T-208 created regarding payment issue.', read: false, timestamp: '2024-04-12T09:15:00Z', link: '/support/T-208' },
    { id: 'N-504', type: 'escrow', title: 'Large Escrow Release', message: 'Transaction TX-113 of €123.50 requires review.', read: true, timestamp: '2024-03-15T10:00:00Z' },
    { id: 'N-505', type: 'system', title: 'System Backup Complete', message: 'Daily database backup completed successfully.', read: true, timestamp: '2024-04-10T00:00:00Z' },
    { id: 'N-506', type: 'sla', title: 'SLA Breach Warning', message: 'Dispute D-102 SLA expires in 2 hours.', read: false, timestamp: '2024-03-22T09:30:00Z' },
    { id: 'N-507', type: 'verification', title: 'Profile Updated', message: 'User U3 updated their profile.', read: true, timestamp: '2024-04-05T11:00:00Z' },
    { id: 'N-508', type: 'dispute', title: 'Dispute Resolved', message: 'Dispute D-101 has been resolved by admin.', read: true, timestamp: '2024-04-01T10:05:00Z' },
    { id: 'N-509', type: 'support', title: 'Unassigned Tickets', message: 'There are 3 unassigned high-priority tickets.', read: false, timestamp: '2024-04-13T08:00:00Z' },
    { id: 'N-510', type: 'system', title: 'New Admin Login', message: 'New login from unknown IP for System Admin.', read: false, timestamp: '2024-04-14T18:45:00Z' }
  ];

  private broadcastsData: Broadcast[] = [
    { id: 'BR-1', title: 'Platform Maintenance', message: 'The platform will be down for 2 hours this Sunday.', targetAudience: 'all', status: 'sent', sentAt: '2024-03-01T10:00:00Z' },
    { id: 'BR-2', title: 'New Service Category', message: 'We have added Childcare to the available categories.', targetAudience: 'providers', status: 'sent', sentAt: '2024-03-15T12:00:00Z' },
    { id: 'BR-3', title: 'Holiday Discount', message: 'Use code SPRING15 for 15% off your next booking.', targetAudience: 'users', status: 'draft' }
  ];

  private notificationsSignal = signal<AppNotification[]>(this.notificationsData);
  private broadcastsSignal = signal<Broadcast[]>(this.broadcastsData);

  getNotifications() { return this.notificationsSignal(); }
  
  getUnreadCount() {
    return this.notificationsSignal().filter(n => !n.read).length;
  }
  
  markAsRead(id: string) {
    this.notificationsSignal.update(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  }
  
  markAllAsRead() {
    this.notificationsSignal.update(ns => ns.map(n => ({ ...n, read: true })));
  }
  
  getBroadcasts() { return this.broadcastsSignal(); }
  
  createBroadcast(broadcast: Omit<Broadcast, 'id'>) {
    const newBroadcast = { ...broadcast, id: 'BR-' + Math.random().toString(36).substr(2, 9) } as Broadcast;
    this.broadcastsSignal.update(bs => [...bs, newBroadcast]);
  }
}
"""
write_file("src/app/core/services/notification.service.ts", notification_service_ts)

report_service_ts = """
import { Injectable } from '@angular/core';
import { ChartData } from '../models';

@Injectable({ providedIn: 'root' })
export class ReportService {
  
  getUserRegistrationData(): ChartData[] {
    return [
      { label: 'Jan', value: 15 },
      { label: 'Feb', value: 25 },
      { label: 'Mar', value: 40 },
      { label: 'Apr', value: 35 },
      { label: 'May', value: 50 },
      { label: 'Jun', value: 65 }
    ];
  }
  
  getProviderPerformanceData(): ChartData[] {
    return [
      { label: '5 Stars', value: 45 },
      { label: '4 Stars', value: 30 },
      { label: '3 Stars', value: 15 },
      { label: '2 Stars', value: 5 },
      { label: '1 Star', value: 5 }
    ];
  }
  
  getRevenueData(): ChartData[] {
    return [
      { label: 'Q1', value: 12000 },
      { label: 'Q2', value: 15500 },
      { label: 'Q3', value: 18000 },
      { label: 'Q4', value: 22000 }
    ];
  }
  
  getBookingFunnelData(): ChartData[] {
    return [
      { label: 'Searches', value: 1000 },
      { label: 'Profile Views', value: 600 },
      { label: 'Inquiries', value: 350 },
      { label: 'Bookings', value: 150 },
      { label: 'Completed', value: 120 }
    ];
  }
  
  getCategoryPopularityData(): ChartData[] {
    return [
      { label: 'Tailoring', value: 25 },
      { label: 'Handyman', value: 20 },
      { label: 'Cooking & Catering', value: 15 },
      { label: 'Translation', value: 15 },
      { label: 'IT Services', value: 10 },
      { label: 'Other', value: 15 }
    ];
  }
  
  getLocationActivityData(): ChartData[] {
    return [
      { label: 'Mitte', value: 120 },
      { label: 'Kreuzberg', value: 95 },
      { label: 'Neukölln', value: 110 },
      { label: 'Friedrichshain', value: 85 },
      { label: 'Wedding', value: 70 }
    ];
  }
}
"""
write_file("src/app/core/services/report.service.ts", report_service_ts)

print("All services and models generated successfully!")
