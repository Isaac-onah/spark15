export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'admin' | 'moderator' | 'support_agent';
  status: 'active' | 'disabled';
  twoFactorEnabled: boolean;
  lastLogin: string;
  actionsCount: number;
  createdAt: string;
  createdBy: string;
}

export type AdminRole = AdminUser['role'];

export const ROLE_LEVELS: Record<AdminRole, number> = {
  super_admin: 0,
  admin: 1,
  moderator: 2,
  support_agent: 3,
};

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  moderator: 'Moderator',
  support_agent: 'Support Agent',
};
