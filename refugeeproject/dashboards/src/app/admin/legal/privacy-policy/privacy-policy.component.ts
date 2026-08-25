import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './privacy-policy.component.html'
})
export class PrivacyPolicyComponent {
  private toastService = inject(ToastService);
  
  content = signal('# Privacy Policy for Spark 15\n\nWelcome to Spark 15. We are committed to protecting your personal data.\n\n## 1. Information We Collect\nWe collect information to provide better services to all our users, from determining basic stuff like which language you speak, to more complex things like finding the most suitable refugee service provider in your area.\n\n## 2. How We Use Information\nWe use the information we collect to provide, maintain, protect and improve our services, to develop new ones, and to protect Spark 15 and our users.');
  lastUpdated = 'October 15, 2023';
  updatedBy = 'Isaac Onah';

  versions = [
    { date: 'Oct 15, 2023', author: 'Isaac Onah' },
    { date: 'Sep 1, 2023', author: 'Legal Team' },
    { date: 'Jan 10, 2023', author: 'System' }
  ];

  savePolicy() {
    this.toastService.success('Success', 'Privacy Policy updated successfully');
  }
}
