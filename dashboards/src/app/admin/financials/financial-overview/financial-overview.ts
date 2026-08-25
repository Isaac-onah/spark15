import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatCard } from '../../../shared/components/stat-card/stat-card';
import { FinancialService } from '../../../core/services/financial.service';
import { CurrencyEurPipe } from '../../../core/pipes/currency-eur.pipe';

@Component({
  selector: 'app-financial-overview',
  standalone: true,
  imports: [CommonModule, Breadcrumb, StatCard, CurrencyEurPipe],
  templateUrl: './financial-overview.html',
  styleUrls: ['./financial-overview.css']
})
export class FinancialOverview {
  private financialService = inject(FinancialService);

  breadcrumbs = [
    { label: 'Dashboard', route: '/admin' },
    { label: 'Financials', route: '/admin/financials' }
  ];

  stats = signal({
    totalEscrow: 45200,
    totalRevenue: 125000,
    platformFees: 12500,
    pendingPayouts: 3400,
    totalRefunds: 1200,
    netRevenue: 11300
  });

  recentTransactions = signal([
    { id: 'TRX-9901', type: 'escrow_funding', amount: 150, status: 'completed', date: new Date() },
    { id: 'TRX-9902', type: 'payout', amount: 200, status: 'pending', date: new Date(Date.now() - 3600000) },
    { id: 'TRX-9903', type: 'refund', amount: 50, status: 'completed', date: new Date(Date.now() - 7200000) },
    { id: 'TRX-9904', type: 'escrow_release', amount: 120, status: 'completed', date: new Date(Date.now() - 86400000) },
    { id: 'TRX-9905', type: 'fee_collection', amount: 1.5, status: 'completed', date: new Date(Date.now() - 86400000) }
  ]);
}
