export interface AuditLogEntry {
  id: string;
  adminId: string;
  adminName: string;
  adminRole: string;
  action: string;
  actionLabel: string;
  targetType: string;
  targetId: string;
  targetLabel: string;
  previousValue?: any;
  newValue?: any;
  ipAddress: string;
  sessionId: string;
  timestamp: string;
}

export const AUDIT_ACTION_TYPES = [
  'user.create', 'user.update', 'user.suspend', 'user.ban', 'user.delete',
  'provider.approve', 'provider.reject', 'provider.suspend', 'provider.feature',
  'booking.cancel', 'booking.override',
  'escrow.release', 'escrow.refund',
  'review.remove', 'review.approve',
  'dispute.assign', 'dispute.resolve', 'dispute.escalate',
  'config.update', 'feature_flag.toggle',
  'admin.create', 'admin.update', 'admin.disable',
] as const;
