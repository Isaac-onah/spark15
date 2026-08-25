import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast.service';
import { Breadcrumb } from '../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, StatusBadge],
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent {
  private toastService = inject(ToastService);
  
  activeTab = signal('mine');

  myNotifications = signal([
    { id: 1, type: 'alert', title: 'High Dispute Rate', message: 'The dispute rate in "Translation" category exceeded 5% this week.', timeAgo: '2 hours ago', read: false },
    { id: 2, type: 'info', title: 'New Provider Approved', message: 'Ahmad M. was approved as a Handyman by Sarah.', timeAgo: '5 hours ago', read: false },
    { id: 3, type: 'success', title: 'Platform Update', message: 'Spark 15 version 2.1.0 was successfully deployed.', timeAgo: '1 day ago', read: true },
    { id: 4, type: 'warning', title: 'Unusual Activity', message: 'Multiple failed login attempts detected for support@spark15.com', timeAgo: '2 days ago', read: true }
  ]);

  broadcasts = signal([
    { id: 1, title: 'Holiday Service Hours', audience: 'All Users', channels: ['In-App', 'Email'], status: 'sent', date: 'Dec 20, 2023', recipients: 12450 },
    { id: 2, title: 'New Commission Structure', audience: 'All Providers', channels: ['Email'], status: 'scheduled', date: 'Jan 1, 2024', recipients: 842 },
    { id: 3, title: 'System Maintenance', audience: 'All Users', channels: ['In-App'], status: 'sent', date: 'Nov 15, 2023', recipients: 11020 }
  ]);

  isModalOpen = signal(false);
  broadcastData = { title: '', message: '', audience: 'all_users', channels: { inApp: true, email: false, sms: false }, schedule: 'now' };

  markAllRead() {
    this.myNotifications.update(n => n.map(x => ({...x, read: true})));
    this.toastService.success('Success', 'All notifications marked as read');
  }

  sendBroadcast() {
    this.toastService.success('Success', 'Broadcast scheduled successfully');
    this.isModalOpen.set(false);
  }
}
