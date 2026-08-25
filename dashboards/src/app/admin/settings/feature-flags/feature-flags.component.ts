import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-feature-flags',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './feature-flags.component.html'
})
export class FeatureFlagsComponent {
  private toastService = inject(ToastService);
  
  flags = signal([
    { key: 'NEW_BOOKING_FLOW', label: 'New Booking Flow', description: 'Enable the redesigned multi-step booking process', enabled: true, lastUpdated: '2 hours ago', by: 'Isaac Onah' },
    { key: 'AI_CHAT_TRANSLATION', label: 'AI Chat Translation', description: 'Real-time message translation using DeepL API', enabled: true, lastUpdated: '1 day ago', by: 'System' },
    { key: 'SMS_NOTIFICATIONS', label: 'SMS Notifications', description: 'Send SMS alerts for critical booking updates', enabled: false, lastUpdated: '3 days ago', by: 'Admin User' },
    { key: 'PROVIDER_BADGES', label: 'Provider Badges', description: 'Show verification and top-rated badges on profiles', enabled: true, lastUpdated: '1 week ago', by: 'Isaac Onah' },
    { key: 'REFERRAL_PROGRAM', label: 'Referral Program', description: 'Enable user referral links and rewards', enabled: false, lastUpdated: '1 month ago', by: 'Marketing' },
    { key: 'DARK_MODE_BETA', label: 'Dark Mode (Beta)', description: 'Allow users to toggle dark mode in app', enabled: false, lastUpdated: '2 months ago', by: 'Dev Team' },
    { key: 'MAINTENANCE_MODE', label: 'Maintenance Mode', description: 'Blocks all non-admin traffic with a maintenance page', enabled: false, lastUpdated: '1 year ago', by: 'Isaac Onah', isWarning: true }
  ]);

  toggleFlag(flag: any) {
    flag.enabled = !flag.enabled;
    this.toastService.success('Success', `Feature flag ${flag.key} ${flag.enabled ? 'enabled' : 'disabled'}`);
  }
}
