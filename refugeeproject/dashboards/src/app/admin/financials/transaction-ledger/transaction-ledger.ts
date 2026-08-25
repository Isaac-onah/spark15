import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { FinancialService } from '../../../core/services/financial.service';
import { CurrencyEurPipe } from '../../../core/pipes/currency-eur.pipe';

@Component({
  selector: 'app-transaction-ledger',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, StatusBadge, Pagination, SearchInput, CurrencyEurPipe],
  templateUrl: './transaction-ledger.html',
  styleUrls: ['./transaction-ledger.css']
})
export class TransactionLedger {
  private financialService = inject(FinancialService);

  breadcrumbs = [
    { label: 'Dashboard', route: '/admin' },
    { label: 'Financials', route: '/admin/financials' },
    { label: 'Ledger', route: '/admin/financials/ledger' }
  ];

  transactions = signal([
    { id: 'TRX-101', type: 'escrow_funding', ref: 'B-1001', from: 'Lukas Schmidt', to: 'Escrow Account', amount: 150, status: 'completed', method: 'Credit Card', date: new Date(Date.now() - 86400000), by: 'System' },
    { id: 'TRX-102', type: 'escrow_release', ref: 'B-1002', from: 'Escrow Account', to: 'Provider Account', amount: 60, status: 'completed', method: 'Internal Transfer', date: new Date(Date.now() - 2 * 86400000), by: 'System' },
    { id: 'TRX-103', type: 'fee_collection', ref: 'B-1002', from: 'Provider Account', to: 'Platform Account', amount: 1.5, status: 'completed', method: 'Internal Transfer', date: new Date(Date.now() - 2 * 86400000), by: 'System' },
    { id: 'TRX-104', type: 'refund', ref: 'B-1005', from: 'Escrow Account', to: 'Leon Wagner', amount: 120, status: 'pending', method: 'Original Payment Method', date: new Date(Date.now() - 3 * 86400000), by: 'Admin Alex' },
    { id: 'TRX-105', type: 'payout', ref: 'Multiple', from: 'Provider Account', to: 'Fatima S. Bank', amount: 450, status: 'processing', method: 'SEPA Transfer', date: new Date(Date.now() - 4 * 86400000), by: 'System' },
    { id: 'TRX-106', type: 'escrow_funding', ref: 'B-1006', from: 'Marie Becker', to: 'Escrow Account', amount: 45, status: 'completed', method: 'PayPal', date: new Date(), by: 'System' },
    { id: 'TRX-107', type: 'escrow_release', ref: 'B-1004', from: 'Escrow Account', to: 'Provider Account', amount: 35, status: 'completed', method: 'Internal Transfer', date: new Date(Date.now() - 5 * 86400000), by: 'Admin Sarah' }
  ]);

  searchQuery = signal('');
  typeFilter = signal('all');

  filteredTransactions = computed(() => {
    let result = this.transactions();
    if (this.typeFilter() !== 'all') {
      result = result.filter(t => t.type === this.typeFilter());
    }
    if (this.searchQuery()) {
      const q = this.searchQuery().toLowerCase();
      result = result.filter(t => t.id.toLowerCase().includes(q) || t.ref.toLowerCase().includes(q) || t.from.toLowerCase().includes(q) || t.to.toLowerCase().includes(q));
    }
    return result;
  });

  onSearch(q: string) {
    this.searchQuery.set(q);
  }
}
