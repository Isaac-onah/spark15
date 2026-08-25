import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { SearchInput } from '../../../shared/components/search-input/search-input';
import { Pagination } from '../../../shared/components/pagination/pagination';
import { ConfirmModal } from '../../../shared/components/confirm-modal/confirm-modal';
import { BookingService } from '../../../core/services/booking.service';
import { ToastService } from '../../../core/services/toast.service';
import { AuthService } from '../../../core/services/auth.service';
import { CurrencyEurPipe } from '../../../core/pipes/currency-eur.pipe';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, StatusBadge, SearchInput, Pagination, ConfirmModal, CurrencyEurPipe, TimeAgoPipe, RouterLink],
  templateUrl: './booking-list.html',
  styleUrls: ['./booking-list.css']
})
export class BookingList {
  private bookingService = inject(BookingService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  breadcrumbs = [
    { label: 'Dashboard', route: '/admin' },
    { label: 'Bookings', route: '/admin/bookings' }
  ];

  bookings = signal<any[]>([
    { id: 'B-1001', clientName: 'Lukas Schmidt', providerName: 'Fatima S.', service: 'Dinner Catering', date: new Date('2026-08-28T18:00:00'), status: 'confirmed', price: 150, escrow: 'funded', createdAt: new Date(Date.now() - 2 * 86400000) },
    { id: 'B-1002', clientName: 'Sophie Weber', providerName: 'Ahmad K.', service: 'Laptop Repair', date: new Date('2026-08-26T10:00:00'), status: 'completed', price: 60, escrow: 'released', createdAt: new Date(Date.now() - 5 * 86400000) },
    { id: 'B-1003', clientName: 'Maximilian Müller', providerName: 'Maryam H.', service: 'Custom Dress', date: new Date('2026-09-02T14:00:00'), status: 'pending', price: 200, escrow: 'pending', createdAt: new Date(Date.now() - 1 * 86400000) },
    { id: 'B-1004', clientName: 'Anna Fischer', providerName: 'Yonas T.', service: 'Math Tutoring', date: new Date('2026-08-27T16:00:00'), status: 'confirmed', price: 35, escrow: 'funded', createdAt: new Date(Date.now() - 3 * 86400000) },
    { id: 'B-1005', clientName: 'Leon Wagner', providerName: 'Zahra R.', service: 'Bridal Makeup', date: new Date('2026-09-15T09:00:00'), status: 'cancelled', price: 120, escrow: 'refunded', createdAt: new Date(Date.now() - 7 * 86400000) },
    { id: 'B-1006', clientName: 'Marie Becker', providerName: 'Hassan A.', service: 'Document Translation', date: new Date('2026-08-29T11:00:00'), status: 'confirmed', price: 45, escrow: 'funded', createdAt: new Date() },
    { id: 'B-1007', clientName: 'Paul Hoffmann', providerName: 'Amira B.', service: 'Evening Childcare', date: new Date('2026-08-30T19:00:00'), status: 'pending', price: 50, escrow: 'pending', createdAt: new Date(Date.now() - 4 * 86400000) }
  ]);

  searchQuery = signal('');
  filterStatus = signal('all');
  
  filteredBookings = computed(() => {
    let result = this.bookings();
    
    if (this.filterStatus() !== 'all') {
      result = result.filter(b => b.status === this.filterStatus());
    }
    
    if (this.searchQuery()) {
      const q = this.searchQuery().toLowerCase();
      result = result.filter(b => 
        b.id.toLowerCase().includes(q) || 
        b.clientName.toLowerCase().includes(q) || 
        b.providerName.toLowerCase().includes(q)
      );
    }
    
    return result;
  });

  isCancelModalOpen = signal(false);
  selectedBookingId = signal<string | null>(null);
  cancelReason = signal('');

  openCancelModal(id: string) {
    this.selectedBookingId.set(id);
    this.isCancelModalOpen.set(true);
  }

  closeCancelModal() {
    this.isCancelModalOpen.set(false);
    this.cancelReason.set('');
    this.selectedBookingId.set(null);
  }

  confirmCancel() {
    const id = this.selectedBookingId();
    if (id) {
      this.bookings.update(bs => 
        bs.map(b => b.id === id ? { ...b, status: 'cancelled', escrow: 'refunded' } : b)
      );
      this.toastService.success('Success', `Booking ${id} cancelled`);
      this.closeCancelModal();
    }
  }

  getTabCount(tab: string): number {
    if (tab === 'all') return this.bookings().length;
    return this.bookings().filter(b => b.status === tab).length;
  }

  overrideStatus(id: string, newStatus: string) {
    this.bookings.update(bs => 
      bs.map(b => b.id === id ? { ...b, status: newStatus } : b)
    );
    this.toastService.success('Success', `Booking ${id} status updated to ${newStatus}`);
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
  }

  setFilter(status: string) {
    this.filterStatus.set(status);
  }
}
