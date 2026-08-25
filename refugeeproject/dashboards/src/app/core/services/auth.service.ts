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
