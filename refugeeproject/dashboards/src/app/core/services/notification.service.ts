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
