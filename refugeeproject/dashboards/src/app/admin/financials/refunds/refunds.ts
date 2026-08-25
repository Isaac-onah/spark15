import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { FinancialService } from '../../../core/services/financial.service';
import { ToastService } from '../../../core/services/toast.service';
import { CurrencyEurPipe } from '../../../core/pipes/currency-eur.pipe';

@Component({
  selector: 'app-refunds',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, StatusBadge, CurrencyEurPipe],
  templateUrl: './refunds.html',
  styleUrls: ['./refunds.css']
})
export class Refunds {
  private toastService = inject(ToastService);
  private financialService = inject(FinancialService);

  breadcrumbs = [
    { label: 'Dashboard', route: '/admin' },
    { label: 'Financials', route: '/admin/financials' },
    { label: 'Refunds', route: '/admin/financials/refunds' }
  ];

  refunds = signal([
    { id: 'RF-101', bookingRef: 'B-1005', clientName: 'Leon Wagner', amount: 120, reason: 'Provider no-show', status: 'pending', date: new Date(Date.now() - 1 * 86400000) },
    { id: 'RF-102', bookingRef: 'B-1008', clientName: 'Julia Bauer', amount: 80, reason: 'Client cancelled > 24h', status: 'completed', date: new Date(Date.now() - 3 * 86400000) },
    { id: 'RF-103', bookingRef: 'B-1009', clientName: 'Tim Meyer', amount: 45, reason: 'Service not as described', status: 'pending', date: new Date(Date.now() - 2 * 86400000) },
    { id: 'RF-104', bookingRef: 'B-1010', clientName: 'Sarah Koch', amount: 200, reason: 'Mutual agreement', status: 'completed', date: new Date(Date.now() - 5 * 86400000) },
    { id: 'RF-105', bookingRef: 'B-1011', clientName: 'Felix Richter', amount: 30, reason: 'Provider cancelled', status: 'rejected', date: new Date(Date.now() - 7 * 86400000) },
    { id: 'RF-106', bookingRef: 'B-1012', clientName: 'Laura Wolf', amount: 150, reason: 'Client dissatisfaction', status: 'pending', date: new Date() },
    { id: 'RF-107', bookingRef: 'B-1013', clientName: 'Max Braun', amount: 60, reason: 'Scheduling conflict', status: 'completed', date: new Date(Date.now() - 10 * 86400000) }
  ]);

  pendingCount = computed(() => this.refunds().filter(r => r.status === 'pending').length);
  processedCount = computed(() => this.refunds().filter(r => r.status === 'completed').length);
  totalRefunded = computed(() => this.refunds().filter(r => r.status === 'completed').reduce((sum, r) => sum + r.amount, 0));

  approveRefund(id: string) {
    this.refunds.update(rs => rs.map(r => r.id === id ? { ...r, status: 'completed' } : r));
    this.toastService.success('Success', `Refund ${id} approved successfully`);
  }

  rejectRefund(id: string) {
    this.refunds.update(rs => rs.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    this.toastService.info('Info', `Refund ${id} rejected`);
  }
}
