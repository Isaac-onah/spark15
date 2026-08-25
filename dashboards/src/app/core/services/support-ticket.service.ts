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
    { id: 'T-203', userId: 'U6', category: 'Billing', priority: 'high', status: 'open', createdAt: '2024-03-15T11:00:00Z', messages: [
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
