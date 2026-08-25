import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-provider-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, StatusBadge, Pagination,
    SearchInput, EmptyState, Breadcrumb
  ],
  templateUrl: './provider-list.html',
  styleUrl: './provider-list.css'
})
export class ProviderListComponent {
  searchQuery = signal('');
  categoryFilter = signal('all');
  statusFilter = signal('all');
  verificationFilter = signal('all');
  currentPage = signal(1);
  itemsPerPage = 10;

  categories = ['all', 'Tailoring', 'Cooking & Catering', 'Tutoring', 'IT Services', 'Translation', 'Cleaning', 'Handyman'];

  providers = signal([
    { id: '1', name: 'Amina F.', category: 'Tailoring', services: ['Dressmaking', 'Alterations'], rate: 25, rating: 4.9, reviews: 124, languages: ['Arabic', 'English'], verification: 'verified', featured: true, status: 'active', totalBookings: 150, totalEarned: 4500 },
    { id: '2', name: 'Tarik M.', category: 'IT Services', services: ['Web Dev', 'PC Repair'], rate: 45, rating: 4.8, reviews: 98, languages: ['Turkish', 'German'], verification: 'verified', featured: true, status: 'active', totalBookings: 85, totalEarned: 6200 },
    { id: '3', name: 'Elena R.', category: 'Cleaning', services: ['House Cleaning', 'Deep Clean'], rate: 20, rating: 4.8, reviews: 156, languages: ['Ukrainian', 'English'], verification: 'verified', featured: false, status: 'active', totalBookings: 210, totalEarned: 5800 },
    { id: '4', name: 'Hassan B.', category: 'Handyman', services: ['Furniture Assembly', 'Plumbing'], rate: 35, rating: 4.7, reviews: 82, languages: ['Arabic', 'German'], verification: 'pending', featured: false, status: 'active', totalBookings: 60, totalEarned: 2400 },
    { id: '5', name: 'Sofia L.', category: 'Tutoring', services: ['Math', 'English'], rate: 30, rating: 4.9, reviews: 45, languages: ['Spanish', 'English', 'German'], verification: 'verified', featured: false, status: 'active', totalBookings: 120, totalEarned: 3600 },
    { id: '6', name: 'Mohammed K.', category: 'Cooking & Catering', services: ['Event Catering', 'Meal Prep'], rate: 40, rating: 4.6, reviews: 32, languages: ['Arabic', 'English'], verification: 'unverified', featured: false, status: 'suspended', totalBookings: 25, totalEarned: 1100 },
    { id: '7', name: 'Fatima N.', category: 'Translation', services: ['Document Trans.', 'Live Trans.'], rate: 35, rating: 5.0, reviews: 12, languages: ['Farsi', 'German'], verification: 'pending', featured: false, status: 'active', totalBookings: 18, totalEarned: 850 },
    { id: '8', name: 'Yusuf K.', category: 'Handyman', services: ['Painting', 'Repairs'], rate: 28, rating: 4.2, reviews: 8, languages: ['Kurdish', 'German'], verification: 'verified', featured: false, status: 'active', totalBookings: 10, totalEarned: 420 }
  ]);

  filteredProviders = computed(() => {
    let filtered = this.providers();
    const query = this.searchQuery().toLowerCase();
    
    if (query) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
    }
    
    const cat = this.categoryFilter();
    if (cat !== 'all') {
      filtered = filtered.filter(p => p.category === cat);
    }
    
    const stat = this.statusFilter();
    if (stat !== 'all') {
      filtered = filtered.filter(p => p.status === stat);
    }
    
    const ver = this.verificationFilter();
    if (ver !== 'all') {
      filtered = filtered.filter(p => p.verification === ver);
    }
    
    return filtered;
  });

  paginatedProviders = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredProviders().slice(start, start + this.itemsPerPage);
  });

  totalItems = computed(() => this.filteredProviders().length);

  onSearch(query: string) {
    this.searchQuery.set(query);
    this.currentPage.set(1);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  toggleFeatured(id: string) {
    this.providers.update(providers => 
      providers.map(p => p.id === id ? { ...p, featured: !p.featured } : p)
    );
  }

  exportToCsv() {
    console.log('Exporting providers to CSV');
  }
}