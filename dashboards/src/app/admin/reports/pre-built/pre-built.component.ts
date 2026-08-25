import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-pre-built',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './pre-built.component.html'
})
export class PreBuiltComponent {
  private toastService = inject(ToastService);
  
  reports = [
    { id: 'user_growth', name: 'User Growth & Retention', desc: 'New registrations, active users, and churn rate over time.', freq: 'Daily', icon: '📈' },
    { id: 'provider_perf', name: 'Provider Performance', desc: 'Earnings, ratings, and completion rates by provider.', freq: 'Weekly', icon: '⭐' },
    { id: 'booking_vol', name: 'Booking Volume', desc: 'Total bookings grouped by category and location.', freq: 'Monthly', icon: '📅' },
    { id: 'revenue', name: 'Financial Revenue', desc: 'Platform fees collected, payouts, and escrow held.', freq: 'Monthly', icon: '💶' },
    { id: 'disputes', name: 'Disputes & Resolutions', desc: 'Number of disputes filed, categories, and resolution times.', freq: 'Weekly', icon: '⚖️' },
    { id: 'demographics', name: 'User Demographics', desc: 'Breakdown of users by language, neighborhood, and origin.', freq: 'Monthly', icon: '🌍' },
    { id: 'search_trends', name: 'Search Trends', desc: 'Most searched terms and services with zero results.', freq: 'Weekly', icon: '🔍' },
    { id: 'compliance', name: 'Trust & Compliance', desc: 'Verification status, flagged accounts, and document approvals.', freq: 'Daily', icon: '🛡️' },
    { id: 'marketing', name: 'Marketing Attribution', desc: 'User acquisition sources and campaign performance.', freq: 'Monthly', icon: '🎯' }
  ];

  selectedReport = signal<any>(null);
  dateRange = { start: '2023-10-01', end: '2023-10-31' };

  mockData = [
    { label: 'Oct 1', value1: 142, value2: 52 },
    { label: 'Oct 8', value1: 156, value2: 60 },
    { label: 'Oct 15', value1: 180, value2: 75 },
    { label: 'Oct 22', value1: 175, value2: 82 },
    { label: 'Oct 29', value1: 210, value2: 95 }
  ];

  selectReport(r: any) {
    this.selectedReport.set(r);
  }

  exportCsv() {
    this.toastService.success('Success', 'Report exported to CSV');
  }
}
