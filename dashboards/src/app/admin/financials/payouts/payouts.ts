import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { FinancialService } from '../../../core/services/financial.service';
import { ToastService } from '../../../core/services/toast.service';
import { CurrencyEurPipe } from '../../../core/pipes/currency-eur.pipe';

@Component({
  selector: 'app-payouts',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, StatusBadge, CurrencyEurPipe],
  templateUrl: './payouts.html',
  styleUrls: ['./payouts.css']
})
export class Payouts {
  private toastService = inject(ToastService);
  private financialService = inject(FinancialService);

  breadcrumbs = [
    { label: 'Dashboard', route: '/admin' },
    { label: 'Financials', route: '/admin/financials' },
    { label: 'Payouts', route: '/admin/financials/payouts' }
  ];

  payouts = signal([
    { id: 'PO-101', providerName: 'Fatima S.', amount: 150, bookingRef: 'B-1001', date: new Date(Date.now() - 86400000), status: 'pending', selected: false },
    { id: 'PO-102', providerName: 'Ahmad K.', amount: 60, bookingRef: 'B-1002', date: new Date(Date.now() - 2 * 86400000), status: 'pending', selected: false },
    { id: 'PO-103', providerName: 'Maryam H.', amount: 200, bookingRef: 'B-1003', date: new Date(Date.now() - 3 * 86400000), status: 'completed', selected: false },
    { id: 'PO-104', providerName: 'Yonas T.', amount: 35, bookingRef: 'B-1004', date: new Date(Date.now() - 4 * 86400000), status: 'pending', selected: false },
    { id: 'PO-105', providerName: 'Zahra R.', amount: 120, bookingRef: 'B-1005', date: new Date(Date.now() - 5 * 86400000), status: 'completed', selected: false },
    { id: 'PO-106', providerName: 'Hassan A.', amount: 45, bookingRef: 'B-1006', date: new Date(), status: 'pending', selected: false },
    { id: 'PO-107', providerName: 'Amira B.', amount: 50, bookingRef: 'B-1007', date: new Date(Date.now() - 6 * 86400000), status: 'completed', selected: false }
  ]);

  pendingPayouts = computed(() => this.payouts().filter(p => p.status === 'pending'));
  completedPayouts = computed(() => this.payouts().filter(p => p.status === 'completed'));
  
  totalPendingAmount = computed(() => this.pendingPayouts().reduce((sum, p) => sum + p.amount, 0));
  
  hasSelected = computed(() => this.pendingPayouts().some(p => p.selected));

  toggleAll(event: any) {
    const checked = event.target.checked;
    this.payouts.update(ps => ps.map(p => p.status === 'pending' ? { ...p, selected: checked } : p));
  }

  releaseSelected() {
    this.payouts.update(ps => ps.map(p => p.selected && p.status === 'pending' ? { ...p, status: 'completed', selected: false } : p));
    this.toastService.success('Success', 'Selected payouts have been released to providers.');
  }
}
