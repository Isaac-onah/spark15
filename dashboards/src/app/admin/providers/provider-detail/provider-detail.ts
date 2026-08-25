import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-provider-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, StatusBadge, Breadcrumb],
  templateUrl: './provider-detail.html',
  styleUrl: './provider-detail.css'
})
export class ProviderDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  
  activeTab = signal<'overview' | 'bookings' | 'reviews' | 'earnings' | 'documents'>('overview');
  providerId = signal('');

  provider = signal({
    id: '1',
    name: 'Amina F.',
    category: 'Tailoring',
    rating: 4.9,
    reviews: 124,
    rate: 25,
    verification: 'verified',
    status: 'active',
    bio: 'Professional tailor with over 10 years of experience in custom clothing, alterations, and repairs. Specialized in traditional and modern garments.',
    services: ['Dressmaking', 'Alterations', 'Repairs', 'Custom Suits'],
    languages: ['Arabic (Native)', 'English (Fluent)', 'German (Basic)'],
    availability: 'Mon - Fri, 9:00 AM - 5:00 PM',
    completionRate: 98,
    avgResponseTime: '2 hours',
    totalBookings: 150,
    totalEarned: 4500
  });

  bookings = signal([
    { id: 'B-1029', client: 'Ahmed Ali', service: 'Alterations', date: '2023-10-20', amount: 45, status: 'completed' },
    { id: 'B-1030', client: 'Sarah Jones', service: 'Custom Dress', date: '2023-10-22', amount: 120, status: 'completed' },
    { id: 'B-1045', client: 'Mohammed K.', service: 'Repairs', date: '2023-10-28', amount: 35, status: 'pending' }
  ]);

  reviewsList = signal([
    { id: 'R-1', rating: 5, comment: 'Amina did an amazing job on my dress! Highly recommended.', reviewer: 'Sarah Jones', date: '2023-10-25' },
    { id: 'R-2', rating: 4, comment: 'Good quality work, slightly delayed but communicative.', reviewer: 'Elena R.', date: '2023-10-15' },
    { id: 'R-3', rating: 5, comment: 'Perfect alterations on my suit.', reviewer: 'Tarik M.', date: '2023-09-28' }
  ]);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.providerId.set(id);
      }
    });
  }

  setTab(tab: 'overview' | 'bookings' | 'reviews' | 'earnings' | 'documents') {
    this.activeTab.set(tab);
  }
}