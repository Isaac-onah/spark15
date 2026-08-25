import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { PlatformConfigService } from '../../../core/services/platform-config.service';
import { ToastService } from '../../../core/services/toast.service';
import { CurrencyEurPipe } from '../../../core/pipes/currency-eur.pipe';

@Component({
  selector: 'app-fee-config',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, CurrencyEurPipe, StatusBadge],
  templateUrl: './fee-config.html',
  styleUrls: ['./fee-config.css']
})
export class FeeConfig {
  private configService = inject(PlatformConfigService);
  private toastService = inject(ToastService);

  breadcrumbs = [
    { label: 'Dashboard', route: '/admin' },
    { label: 'Financials', route: '/admin/financials' },
    { label: 'Fee Configuration', route: '/admin/financials/fee-config' }
  ];

  feeType = signal('flat');
  feeAmount = signal(1.00);
  minCap = signal(0);
  maxCap = signal(50);
  
  stripeKey = signal('sk_test_************************');
  revolutEnabled = signal(true);

  saveSettings() {
    this.toastService.success('Success', 'Platform fee configuration saved successfully.');
  }

  saveProviderSettings() {
    this.toastService.success('Success', 'Payment provider settings updated.');
  }
}
