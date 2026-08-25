import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatCard } from '../../../shared/components/stat-card/stat-card';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Breadcrumb, StatCard, StatusBadge, Pagination, TimeAgoPipe],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css'
})
export class TicketListComponent {
  statusFilter = signal('all');
  searchQuery = signal('');
  currentPage = signal(1);

  stats = signal({
    open: 24,
    inProgress: 12,
    waitingOnUser: 8,
    resolved: 356
  });

  tickets = signal([
    { id: 'TKT-1042', subject: 'Cannot upload profile picture', submittedBy: 'Omar Khaled', userType: 'Provider', category: 'Technical Issue', priority: 'low', status: 'open', assignedTo: null, created: new Date(Date.now() - 1000 * 60 * 30), lastUpdated: new Date(Date.now() - 1000 * 60 * 30) },
    { id: 'TKT-1041', subject: 'Payout not received', submittedBy: 'Amina Tailoring', userType: 'Provider', category: 'Billing', priority: 'high', status: 'in_progress', assignedTo: 'Admin Sarah', created: new Date(Date.now() - 1000 * 60 * 60 * 12), lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { id: 'TKT-1040', subject: 'How do I change my booking time?', submittedBy: 'Julia Müller', userType: 'Client', category: 'General Inquiry', priority: 'low', status: 'waiting_on_user', assignedTo: 'Admin Tom', created: new Date(Date.now() - 1000 * 60 * 60 * 24), lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 10) },
    { id: 'TKT-1039', subject: 'Account suspended unfairly', submittedBy: 'Fast Handyman', userType: 'Provider', category: 'Account', priority: 'urgent', status: 'open', assignedTo: null, created: new Date(Date.now() - 1000 * 60 * 60 * 48), lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 48) },
    { id: 'TKT-1038', subject: 'App crashes on Android 10', submittedBy: 'Mohammed Ali', userType: 'Client', category: 'Technical Issue', priority: 'medium', status: 'resolved', assignedTo: 'Admin Tech', created: new Date(Date.now() - 1000 * 60 * 60 * 72), lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { id: 'TKT-1037', subject: 'Requesting invoice for last month', submittedBy: 'Berlin Tech Hub', userType: 'Client', category: 'Billing', priority: 'medium', status: 'open', assignedTo: null, created: new Date(Date.now() - 1000 * 60 * 60 * 5), lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 5) },
    { id: 'TKT-1036', subject: 'Language settings not saving', submittedBy: 'Fatima Noor', userType: 'Provider', category: 'Technical Issue', priority: 'low', status: 'in_progress', assignedTo: 'Admin Tech', created: new Date(Date.now() - 1000 * 60 * 60 * 16), lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 1) }
  ]);

  getPriorityColor(priority: string): string {
    switch(priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
}
