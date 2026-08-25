import { Injectable, signal, computed } from '@angular/core';
import { Booking } from '../models';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bookingsData: Booking[] = [
    { id: 'B-1001', userId: 'U1', providerId: 'P1', userName: 'Hans Müller', providerName: 'Fatima S.', serviceCategory: 'Tailoring', date: '2024-03-01T10:00:00Z', price: 75, status: 'completed', escrowStatus: 'released' },
    { id: 'B-1002', userId: 'U2', providerId: 'P2', userName: 'Amina Al-Fayed', providerName: 'Ahmad K.', serviceCategory: 'Handyman', date: '2024-03-05T14:00:00Z', price: 105, status: 'completed', escrowStatus: 'released' },
    { id: 'B-1003', userId: 'U3', providerId: 'P3', userName: 'Jürgen Schmidt', providerName: 'Maryam H.', serviceCategory: 'Cooking & Catering', date: '2024-03-10T18:00:00Z', price: 200, status: 'cancelled', escrowStatus: 'refunded' },
    { id: 'B-1004', userId: 'U4', providerId: 'P5', userName: 'Tariq Hassan', providerName: 'Hassan A.', serviceCategory: 'IT Services', date: '2024-03-15T09:00:00Z', price: 130, status: 'completed', escrowStatus: 'released' },
    { id: 'B-1005', userId: 'U5', providerId: 'P6', userName: 'Sabine Meyer', providerName: 'Amira B.', serviceCategory: 'Beauty & Hair', date: '2024-03-20T11:30:00Z', price: 60, status: 'pending', escrowStatus: 'held' },
    { id: 'B-1006', userId: 'U7', providerId: 'P8', userName: 'Michael Weber', providerName: 'Zahra R.', serviceCategory: 'Translation', date: '2024-03-25T15:00:00Z', price: 90, status: 'confirmed', escrowStatus: 'held' },
    { id: 'B-1007', userId: 'U8', providerId: 'P10', userName: 'Zahra Noori', providerName: 'Leila N.', serviceCategory: 'Childcare', date: '2024-03-28T08:00:00Z', price: 110, status: 'completed', escrowStatus: 'released' },
    { id: 'B-1008', userId: 'U10', providerId: 'P1', userName: 'Mohammed Ali', providerName: 'Fatima S.', serviceCategory: 'Tailoring', date: '2024-04-02T13:00:00Z', price: 50, status: 'confirmed', escrowStatus: 'held' },
    { id: 'B-1009', userId: 'U12', providerId: 'P4', userName: 'Aisha Farah', providerName: 'Yonas T.', serviceCategory: 'Tutoring', date: '2024-04-05T16:00:00Z', price: 40, status: 'pending', escrowStatus: 'held' },
    { id: 'B-1010', userId: 'U1', providerId: 'P2', userName: 'Hans Müller', providerName: 'Ahmad K.', serviceCategory: 'Handyman', date: '2024-04-10T10:00:00Z', price: 70, status: 'cancelled', escrowStatus: 'refunded' },
    { id: 'B-1011', userId: 'U2', providerId: 'P7', userName: 'Amina Al-Fayed', providerName: 'Dawit M.', serviceCategory: 'Cleaning', date: '2024-04-12T09:00:00Z', price: 45, status: 'completed', escrowStatus: 'released' },
    { id: 'B-1012', userId: 'U4', providerId: 'P11', userName: 'Tariq Hassan', providerName: 'Rashid D.', serviceCategory: 'Music & Arts', date: '2024-04-15T17:00:00Z', price: 150, status: 'confirmed', escrowStatus: 'held' },
    { id: 'B-1013', userId: 'U7', providerId: 'P3', userName: 'Michael Weber', providerName: 'Maryam H.', serviceCategory: 'Cooking & Catering', date: '2024-04-18T19:00:00Z', price: 180, status: 'pending', escrowStatus: 'held' },
    { id: 'B-1014', userId: 'U8', providerId: 'P5', userName: 'Zahra Noori', providerName: 'Hassan A.', serviceCategory: 'IT Services', date: '2024-04-22T11:00:00Z', price: 195, status: 'completed', escrowStatus: 'released' },
    { id: 'B-1015', userId: 'U11', providerId: 'P9', userName: 'Lukas Becker', providerName: 'Omar J.', serviceCategory: 'Handyman', date: '2024-04-25T14:30:00Z', price: 56, status: 'pending', escrowStatus: 'held' }
  ];

  private bookingsSignal = signal<Booking[]>(this.bookingsData);
  bookings = computed(() => this.bookingsSignal());

  getBookings() { return this.bookingsSignal(); }
  getBookingById(id: string) { return this.bookingsSignal().find(b => b.id === id); }
  getBookingsByUser(userId: string) { return this.bookingsSignal().filter(b => b.userId === userId); }
  getBookingsByProvider(providerId: string) { return this.bookingsSignal().filter(b => b.providerId === providerId); }
  
  updateStatus(id: string, status: Booking['status'], reason?: string) {
    this.bookingsSignal.update(bookings => bookings.map(b => b.id === id ? { ...b, status } : b));
  }
  
  getStats() {
    const bookings = this.bookingsSignal();
    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      totalVolume: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0)
    };
  }
}
