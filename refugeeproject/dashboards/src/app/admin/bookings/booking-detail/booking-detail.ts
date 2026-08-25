import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { BookingService } from '../../../core/services/booking.service';
import { ToastService } from '../../../core/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyEurPipe } from '../../../core/pipes/currency-eur.pipe';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, StatusBadge, CurrencyEurPipe],
  templateUrl: './booking-detail.html',
  styleUrls: ['./booking-detail.css']
})
export class BookingDetail {
  private route = inject(ActivatedRoute);
  private bookingService = inject(BookingService);
  private toastService = inject(ToastService);

  bookingId = signal('B-1001');

  breadcrumbs = computed(() => [
    { label: 'Dashboard', route: '/admin' },
    { label: 'Bookings', route: '/admin/bookings' },
    { label: this.bookingId(), route: `/admin/bookings/${this.bookingId()}` }
  ]);

  booking = signal<any>({
    id: 'B-1001',
    status: 'confirmed',
    escrow: 'funded',
    createdAt: new Date(Date.now() - 2 * 86400000),
    service: {
      name: 'Dinner Catering',
      date: new Date('2026-08-28T18:00:00'),
      duration: '4 hours',
      price: 150
    },
    client: {
      name: 'Lukas Schmidt',
      email: 'lukas@example.com',
      phone: '+49 151 12345678'
    },
    provider: {
      name: 'Fatima S.',
      category: 'Cooking & Catering',
      rating: 4.8
    },
    timeline: [
      { step: 'Created', status: 'completed', date: new Date(Date.now() - 2 * 86400000) },
      { step: 'Escrow Funded', status: 'completed', date: new Date(Date.now() - 1 * 86400000) },
      { step: 'Confirmed', status: 'completed', date: new Date(Date.now() - 12 * 3600000) },
      { step: 'Delivered', status: 'pending', date: null },
      { step: 'Escrow Released', status: 'pending', date: null }
    ]
  });

  adminNotes = signal('Client called regarding dietary restrictions. Provider notified.');

  saveNotes() {
    this.toastService.success('Success', 'Admin notes saved successfully.');
  }

  cancelBooking() {
    this.toastService.error('Error', 'Booking cancelled.');
    this.booking.update(b => ({ ...b, status: 'cancelled' }));
  }

  forceRelease() {
    this.toastService.success('Success', 'Escrow released to provider.');
    this.booking.update(b => ({ ...b, escrow: 'released', status: 'completed' }));
  }

  forceRefund() {
    this.toastService.info('Info', 'Funds refunded to client.');
    this.booking.update(b => ({ ...b, escrow: 'refunded', status: 'cancelled' }));
  }
}
