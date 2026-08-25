import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { ConfirmModal } from '../../../shared/components/confirm-modal/confirm-modal';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, StatusBadge, Pagination,
    SearchInput, ConfirmModal, EmptyState, Breadcrumb
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserListComponent {
  searchQuery = signal('');
  statusFilter = signal<'all' | 'active' | 'suspended' | 'banned'>('all');
  currentPage = signal(1);
  itemsPerPage = 10;
  
  modalOpen = signal(false);
  modalTitle = signal('');
  modalMessage = signal('');
  modalAction = signal<(() => void) | null>(null);

  users = signal([
    { id: '1', name: 'Ahmed Ali', email: 'ahmed@example.com', phone: '+49 151 2345678', location: 'Kreuzberg', profileStatus: 'complete', accountStatus: 'active', joinDate: '2023-01-15', totalBookings: 12, totalSpent: 450 },
    { id: '2', name: 'Sarah Jones', email: 'sarah@example.com', phone: '+49 152 3456789', location: 'Mitte', profileStatus: 'complete', accountStatus: 'active', joinDate: '2023-02-20', totalBookings: 5, totalSpent: 180 },
    { id: '3', name: 'Mohammed K.', email: 'mohammed@example.com', phone: '+49 153 4567890', location: 'Neukölln', profileStatus: 'incomplete', accountStatus: 'suspended', joinDate: '2023-03-10', totalBookings: 0, totalSpent: 0 },
    { id: '4', name: 'Elena R.', email: 'elena@example.com', phone: '+49 154 5678901', location: 'Prenzlauer Berg', profileStatus: 'complete', accountStatus: 'active', joinDate: '2023-04-05', totalBookings: 24, totalSpent: 950 },
    { id: '5', name: 'Tarik M.', email: 'tarik@example.com', phone: '+49 155 6789012', location: 'Friedrichshain', profileStatus: 'complete', accountStatus: 'banned', joinDate: '2023-05-12', totalBookings: 2, totalSpent: 75 },
    { id: '6', name: 'Lisa W.', email: 'lisa@example.com', phone: '+49 156 7890123', location: 'Charlottenburg', profileStatus: 'complete', accountStatus: 'active', joinDate: '2023-06-18', totalBookings: 8, totalSpent: 320 },
    { id: '7', name: 'Omar F.', email: 'omar@example.com', phone: '+49 157 8901234', location: 'Schöneberg', profileStatus: 'incomplete', accountStatus: 'active', joinDate: '2023-07-22', totalBookings: 1, totalSpent: 45 },
    { id: '8', name: 'Julia B.', email: 'julia@example.com', phone: '+49 158 9012345', location: 'Tempelhof', profileStatus: 'complete', accountStatus: 'active', joinDate: '2023-08-30', totalBookings: 15, totalSpent: 600 }
  ]);

  filteredUsers = computed(() => {
    let filtered = this.users();
    const query = this.searchQuery().toLowerCase();
    
    if (query) {
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(query) || 
        u.email.toLowerCase().includes(query)
      );
    }
    
    const status = this.statusFilter();
    if (status !== 'all') {
      filtered = filtered.filter(u => u.accountStatus === status);
    }
    
    return filtered;
  });

  paginatedUsers = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredUsers().slice(start, start + this.itemsPerPage);
  });

  totalItems = computed(() => this.filteredUsers().length);

  setStatusFilter(status: 'all' | 'active' | 'suspended' | 'banned') {
    this.statusFilter.set(status);
    this.currentPage.set(1);
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    this.currentPage.set(1);
  }
  
  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  suspendUser(user: any) {
    this.modalTitle.set(`Suspend ${user.name}?`);
    this.modalMessage.set('Are you sure you want to suspend this user? They will not be able to log in.');
    this.modalAction.set(() => {
      this.users.update(users => users.map(u => u.id === user.id ? { ...u, accountStatus: 'suspended' } : u));
      this.closeModal();
    });
    this.modalOpen.set(true);
  }

  banUser(user: any) {
    this.modalTitle.set(`Ban ${user.name}?`);
    this.modalMessage.set('Are you sure you want to permanently ban this user?');
    this.modalAction.set(() => {
      this.users.update(users => users.map(u => u.id === user.id ? { ...u, accountStatus: 'banned' } : u));
      this.closeModal();
    });
    this.modalOpen.set(true);
  }

  deleteUser(user: any) {
    this.modalTitle.set(`Delete ${user.name}?`);
    this.modalMessage.set('Are you sure you want to delete this user? This action cannot be undone.');
    this.modalAction.set(() => {
      this.users.update(users => users.filter(u => u.id !== user.id));
      this.closeModal();
    });
    this.modalOpen.set(true);
  }
  
  closeModal() {
    this.modalOpen.set(false);
  }

  confirmModal() {
    const action = this.modalAction();
    if (action) action();
  }

  exportToCsv() {
    console.log('Exporting CSV...');
  }
}