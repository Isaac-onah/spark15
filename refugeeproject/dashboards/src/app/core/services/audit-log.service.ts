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
