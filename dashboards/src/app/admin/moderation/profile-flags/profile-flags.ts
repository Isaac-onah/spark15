import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';

@Component({
  selector: 'app-profile-flags',
  standalone: true,
  imports: [CommonModule, Breadcrumb, StatusBadge, TimeAgoPipe],
  templateUrl: './profile-flags.html',
  styleUrl: './profile-flags.css'
})
export class ProfileFlagsComponent {
  profiles = signal([
    { providerId: 'p1', providerName: 'Kreuzberg Cooks', category: 'Cooking & Catering', flagReason: 'misleading_services', flaggedContent: 'Claims to have a 5-star Michelin rating which is false.', flaggedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), status: 'open' },
    { providerId: 'p2', providerName: 'Samir Handyman', category: 'Handyman', flagReason: 'policy_violation', flaggedContent: 'Includes direct payment links in profile description.', flaggedAt: new Date(Date.now() - 1000 * 60 * 60 * 12), status: 'open' },
    { providerId: 'p3', providerName: 'Berlin Beauty', category: 'Beauty & Hair', flagReason: 'inappropriate_description', flaggedContent: 'Offensive language used in the about section.', flaggedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), status: 'under_review' },
    { providerId: 'p4', providerName: 'Tariq Tutoring', category: 'Tutoring', flagReason: 'misleading_services', flaggedContent: 'Promises guaranteed A+ grades and university admission.', flaggedAt: new Date(Date.now() - 1000 * 60 * 60 * 72), status: 'open' }
  ]);

  approveProfile(id: string) {
    this.profiles.update(ps => ps.map(p => p.providerId === id ? { ...p, status: 'approved' } : p));
  }

  removeProfile(id: string) {
    this.profiles.update(ps => ps.map(p => p.providerId === id ? { ...p, status: 'removed' } : p));
  }
}
