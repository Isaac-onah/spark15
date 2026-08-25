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
  selector: 'app-dispute-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Breadcrumb, StatCard, StatusBadge, Pagination, TimeAgoPipe],
  templateUrl: './dispute-list.html',
  styleUrl: './dispute-list.css'
})
export class DisputeListComponent {
  statusFilter = signal('All');
  priorityFilter = signal('All');
  categoryFilter = signal('All');
  currentPage = signal(1);

  stats = signal({
    open: 15,
    underInvestigation: 8,
    awaitingResponse: 5,
    resolved: 142,
    escalated: 3
  });

  disputes = signal([
    { id: 'DSP-8492', bookingRef: 'BK-1029', clientName: 'Lukas Meier', providerName: 'Amina Tailoring', category: 'Tailoring', priority: 'high', status: 'open', createdDate: new Date(Date.now() - 1000 * 60 * 60 * 2), slaTimerHours: 22, assignedTo: null },
    { id: 'DSP-8491', bookingRef: 'BK-0982', clientName: 'Sarah Weber', providerName: 'Syrian Delights', category: 'Cooking & Catering', priority: 'medium', status: 'under_investigation', createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24), slaTimerHours: -2, assignedTo: 'Admin Sarah' },
    { id: 'DSP-8490', bookingRef: 'BK-0911', clientName: 'Mohammed Ali', providerName: 'TechFix Berlin', category: 'IT Services', priority: 'urgent', status: 'escalated', createdDate: new Date(Date.now() - 1000 * 60 * 60 * 48), slaTimerHours: -10, assignedTo: 'Super Admin' },
    { id: 'DSP-8489', bookingRef: 'BK-0876', clientName: 'Elena Schmidt', providerName: 'Kurdish Translations', category: 'Translation', priority: 'low', status: 'awaiting_response', createdDate: new Date(Date.now() - 1000 * 60 * 60 * 72), slaTimerHours: 14, assignedTo: 'Admin Tom' },
    { id: 'DSP-8488', bookingRef: 'BK-0844', clientName: 'Julia Müller', providerName: 'Neukölln Barbers', category: 'Beauty & Hair', priority: 'medium', status: 'resolved', createdDate: new Date(Date.now() - 1000 * 60 * 60 * 120), slaTimerHours: 0, assignedTo: 'Admin Sarah' },
    { id: 'DSP-8487', bookingRef: 'BK-0812', clientName: 'Amir Hassan', providerName: 'Fast Handyman', category: 'Handyman', priority: 'high', status: 'open', createdDate: new Date(Date.now() - 1000 * 60 * 60 * 5), slaTimerHours: 19, assignedTo: null },
    { id: 'DSP-8486', bookingRef: 'BK-0799', clientName: 'Fatima Noor', providerName: 'Tariq Tutoring', category: 'Tutoring', priority: 'medium', status: 'resolved', createdDate: new Date(Date.now() - 1000 * 60 * 60 * 160), slaTimerHours: 0, assignedTo: 'Admin Tom' },
    { id: 'DSP-8485', bookingRef: 'BK-0750', clientName: 'Stefan Bauer', providerName: 'Kreuzberg Cooks', category: 'Cooking & Catering', priority: 'low', status: 'under_investigation', createdDate: new Date(Date.now() - 1000 * 60 * 60 * 20), slaTimerHours: 28, assignedTo: 'Admin Sarah' }
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

  getStatusBadge(status: string): string {
    switch(status) {
      case 'open': return 'error';
      case 'under_investigation': return 'warning';
      case 'awaiting_response': return 'pending';
      case 'resolved': return 'active';
      case 'escalated': return 'error';
      default: return 'default';
    }
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
}
