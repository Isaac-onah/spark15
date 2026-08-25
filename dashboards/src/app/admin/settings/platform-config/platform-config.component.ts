import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlatformConfigService } from '../../../core/services/platform-config.service';
import { ToastService } from '../../../core/services/toast.service';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-platform-config',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './platform-config.component.html'
})
export class PlatformConfigComponent {
  private configService = inject(PlatformConfigService);
  private toastService = inject(ToastService);

  config = signal({
    platformName: 'Spark 15',
    currency: 'EUR',
    defaultLanguage: 'de',
    supportedLanguages: { en: true, de: true, ar: true, ti: false, fa: false },
    minHourlyRate: 15,
    maxHourlyRate: 100,
    providerApprovalRequired: true,
    escrowHoldDurationDays: 3,
    autoCancelTimeoutHours: 24,
    reviewMinLength: 20,
    reviewModerationMode: 'auto-approve',
    maintenanceMode: false,
    maintenanceMessage: 'We are currently undergoing maintenance. Please check back later.'
  });

  saveConfig() {
    this.toastService.success('Success', 'Configuration saved successfully');
  }
}
