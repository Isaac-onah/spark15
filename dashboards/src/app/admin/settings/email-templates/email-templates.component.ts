import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-email-templates',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, StatusBadge],
  templateUrl: './email-templates.component.html'
})
export class EmailTemplatesComponent {
  private toastService = inject(ToastService);
  
  templates = signal([
    { id: 1, name: 'Welcome Email', subject: 'Welcome to Spark 15!', category: 'auth', lastEdited: '2 days ago', editedBy: 'Isaac Onah' },
    { id: 2, name: 'Verify Email', subject: 'Verify your email address', category: 'auth', lastEdited: '1 week ago', editedBy: 'System' },
    { id: 3, name: 'Password Reset', subject: 'Reset your password', category: 'auth', lastEdited: '1 week ago', editedBy: 'System' },
    { id: 4, name: 'Booking Confirmed', subject: 'Your booking has been confirmed', category: 'booking', lastEdited: '3 days ago', editedBy: 'Admin User' },
    { id: 5, name: 'Booking Cancelled', subject: 'Booking cancellation notice', category: 'booking', lastEdited: '1 month ago', editedBy: 'Isaac Onah' },
    { id: 6, name: 'Escrow Funded', subject: 'Funds secured in escrow', category: 'payment', lastEdited: '2 weeks ago', editedBy: 'Finance' },
    { id: 7, name: 'Escrow Released', subject: 'Payment released to provider', category: 'payment', lastEdited: '2 weeks ago', editedBy: 'Finance' },
    { id: 8, name: 'Review Received', subject: 'You received a new review', category: 'notification', lastEdited: '1 month ago', editedBy: 'System' },
    { id: 9, name: 'Account Suspended', subject: 'Important notice regarding your account', category: 'moderation', lastEdited: '1 week ago', editedBy: 'Isaac Onah' },
    { id: 10, name: 'Profile Approved', subject: 'Your provider profile is live!', category: 'moderation', lastEdited: '3 days ago', editedBy: 'Isaac Onah' }
  ]);

  categories = ['All', 'auth', 'booking', 'payment', 'notification', 'moderation'];
  activeCategory = signal('All');
  
  isModalOpen = signal(false);
  editingTemplate = signal<any>(null);

  editTemplate(tmpl: any) {
    this.editingTemplate.set({ ...tmpl, body: 'Hello {{user.firstName}},\n\nThis is a sample email body.\n\nBest,\nSpark 15 Team' });
    this.isModalOpen.set(true);
  }

  saveTemplate() {
    this.toastService.success('Success', 'Template saved successfully');
    this.isModalOpen.set(false);
  }
}
