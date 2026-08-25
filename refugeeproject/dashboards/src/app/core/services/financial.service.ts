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
