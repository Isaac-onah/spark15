import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatCard } from '../../../shared/components/stat-card/stat-card';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';
import { TruncatePipe } from '../../../core/pipes/truncate.pipe';

@Component({
  selector: 'app-review-queue',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, StatCard, StatusBadge, TimeAgoPipe, TruncatePipe],
  templateUrl: './review-queue.html',
  styleUrl: './review-queue.css'
})
export class ReviewQueueComponent {
  // Assume ModerationService and ToastService are properly injected in a real scenario
  // Mocking data directly in component since we don't have access to the actual services
  
  statusFilter = signal<'all' | 'flagged' | 'published' | 'under_review' | 'removed'>('all');
  searchQuery = signal<string>('');
  currentPage = signal<number>(1);

  stats = signal({
    totalReviews: 2453,
    flaggedReviews: 12,
    underReview: 4,
    removed: 89
  });

  reviews = signal<any[]>([
    { id: '1', reviewerName: 'Hassan Ali', rating: 1, text: 'Terrible service, the provider never showed up and stopped responding.', providerName: 'Berlin Cleaners', date: new Date(Date.now() - 1000 * 60 * 60 * 2), flagReason: 'harassment', status: 'flagged' },
    { id: '2', reviewerName: 'Julia Müller', rating: 5, text: 'Excellent tailoring work on my suit. Highly recommend!', providerName: 'Amina Tailoring', date: new Date(Date.now() - 1000 * 60 * 60 * 24), flagReason: null, status: 'published' },
    { id: '3', reviewerName: 'Ahmad Khan', rating: 2, text: 'Food was too spicy and not authentic as advertised.', providerName: 'Syrian Delights Catering', date: new Date(Date.now() - 1000 * 60 * 60 * 48), flagReason: 'dispute', status: 'under_review' },
    { id: '4', reviewerName: 'Sarah Weber', rating: 1, text: 'This person is a fraud. Do not book them!!! [contains external link]', providerName: 'Fast Handyman', date: new Date(Date.now() - 1000 * 60 * 60 * 72), flagReason: 'spam', status: 'removed' },
    { id: '5', reviewerName: 'Mona Youssef', rating: 4, text: 'Good IT support but a bit late.', providerName: 'TechFix Berlin', date: new Date(Date.now() - 1000 * 60 * 60 * 96), flagReason: null, status: 'published' },
    { id: '6', reviewerName: 'Elena Schmidt', rating: 1, text: 'Very bad translation. I suspect Google Translate was used.', providerName: 'Kurdish Translations', date: new Date(Date.now() - 1000 * 60 * 60 * 120), flagReason: 'quality', status: 'flagged' },
    { id: '7', reviewerName: 'Tariq Mahmoud', rating: 5, text: 'Great haircut, very friendly.', providerName: 'Neukölln Barbers', date: new Date(Date.now() - 1000 * 60 * 60 * 144), flagReason: null, status: 'published' }
  ]);

  filteredReviews = computed(() => {
    return this.reviews().filter(r => {
      const matchStatus = this.statusFilter() === 'all' || r.status === this.statusFilter();
      const matchSearch = r.reviewerName?.toLowerCase().includes(this.searchQuery().toLowerCase()) || 
                          r.text?.toLowerCase().includes(this.searchQuery().toLowerCase());
      return matchStatus && matchSearch;
    });
  });

  approveReview(id: string) {
    this.reviews.update(rs => rs.map(r => r.id === id ? { ...r, status: 'published' } : r));
  }

  removeReview(id: string) {
    this.reviews.update(rs => rs.map(r => r.id === id ? { ...r, status: 'removed' } : r));
  }

  viewReviewDetail(review: any) {
    // view detail logic
  }
}
