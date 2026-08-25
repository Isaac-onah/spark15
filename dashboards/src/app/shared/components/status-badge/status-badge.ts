import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrls: ['./status-badge.css']
})
export class StatusBadge {
  status = input.required<string>();
  variant = input<'pill' | 'dot'>('pill');
  
  colorClasses = computed(() => {
    const s = this.status().toLowerCase();
    const map: Record<string, string> = {
      'active': 'bg-emerald-100 text-emerald-800',
      'approved': 'bg-emerald-100 text-emerald-800',
      'completed': 'bg-emerald-100 text-emerald-800',
      'published': 'bg-emerald-100 text-emerald-800',
      'released': 'bg-emerald-100 text-emerald-800',
      'resolved': 'bg-emerald-100 text-emerald-800',
      'sent': 'bg-emerald-100 text-emerald-800',
      'pending': 'bg-amber-100 text-amber-800',
      'under_review': 'bg-amber-100 text-amber-800',
      'in_progress': 'bg-amber-100 text-amber-800',
      'waiting_on_user': 'bg-amber-100 text-amber-800',
      'awaiting_response': 'bg-amber-100 text-amber-800',
      'more_info': 'bg-amber-100 text-amber-800',
      'funded': 'bg-blue-100 text-blue-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'held': 'bg-blue-100 text-blue-800',
      'open': 'bg-blue-100 text-blue-800',
      'scheduled': 'bg-blue-100 text-blue-800',
      'draft': 'bg-gray-100 text-gray-800',
      'under_investigation': 'bg-purple-100 text-purple-800',
      'escalated': 'bg-purple-100 text-purple-800',
      'suspended': 'bg-orange-100 text-orange-800',
      'disabled': 'bg-orange-100 text-orange-800',
      'banned': 'bg-rose-100 text-rose-800',
      'cancelled': 'bg-rose-100 text-rose-800',
      'rejected': 'bg-rose-100 text-rose-800',
      'failed': 'bg-rose-100 text-rose-800',
      'removed': 'bg-rose-100 text-rose-800',
      'reversed': 'bg-rose-100 text-rose-800',
      'refunded': 'bg-rose-100 text-rose-800',
      'closed': 'bg-gray-100 text-gray-600',
      'incomplete': 'bg-gray-100 text-gray-600',
      'inactive': 'bg-gray-100 text-gray-600',
    };
    return map[s] || 'bg-gray-100 text-gray-800';
  });

  dotColorClasses = computed(() => {
    const s = this.status().toLowerCase();
    const map: Record<string, string> = {
      'active': 'bg-emerald-500', 'approved': 'bg-emerald-500', 'completed': 'bg-emerald-500',
      'pending': 'bg-amber-500', 'under_review': 'bg-amber-500', 'in_progress': 'bg-amber-500',
      'confirmed': 'bg-blue-500', 'open': 'bg-blue-500', 'funded': 'bg-blue-500',
      'suspended': 'bg-orange-500', 'banned': 'bg-rose-500', 'cancelled': 'bg-rose-500',
      'rejected': 'bg-rose-500', 'failed': 'bg-rose-500',
    };
    return map[s] || 'bg-gray-500';
  });

  displayLabel = computed(() => {
    return this.status().replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  });
}
