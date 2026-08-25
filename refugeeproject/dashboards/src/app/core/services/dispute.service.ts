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
