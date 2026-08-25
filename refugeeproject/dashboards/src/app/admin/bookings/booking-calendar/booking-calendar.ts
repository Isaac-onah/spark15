import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-booking-calendar',
  standalone: true,
  imports: [CommonModule, Breadcrumb],
  templateUrl: './booking-calendar.html',
  styleUrls: ['./booking-calendar.css']
})
export class BookingCalendar {
  breadcrumbs = [
    { label: 'Dashboard', route: '/admin' },
    { label: 'Bookings', route: '/admin/bookings' },
    { label: 'Calendar', route: '/admin/bookings/calendar' }
  ];

  today = new Date();
  currentMonth = signal(this.today.getMonth());
  currentYear = signal(this.today.getFullYear());
  selectedDate = signal<Date | null>(null);

  mockBookings = [
    { id: 'B-101', date: new Date(this.today.getFullYear(), this.today.getMonth(), 5), status: 'confirmed', title: 'Catering' },
    { id: 'B-102', date: new Date(this.today.getFullYear(), this.today.getMonth(), 5), status: 'pending', title: 'Tutoring' },
    { id: 'B-103', date: new Date(this.today.getFullYear(), this.today.getMonth(), 12), status: 'completed', title: 'Cleaning' },
    { id: 'B-104', date: new Date(this.today.getFullYear(), this.today.getMonth(), 18), status: 'confirmed', title: 'IT Repair' },
    { id: 'B-105', date: new Date(this.today.getFullYear(), this.today.getMonth(), 18), status: 'confirmed', title: 'Translation' },
    { id: 'B-106', date: new Date(this.today.getFullYear(), this.today.getMonth(), 18), status: 'pending', title: 'Hair' },
    { id: 'B-107', date: new Date(this.today.getFullYear(), this.today.getMonth(), 18), status: 'cancelled', title: 'Tailoring' }
  ];

  monthName = computed(() => {
    return new Date(this.currentYear(), this.currentMonth(), 1).toLocaleString('default', { month: 'long', year: 'numeric' });
  });

  calendarGrid = computed(() => {
    const year = this.currentYear();
    const month = this.currentMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Mon=0
    
    let days = [];
    let currentDay = new Date(year, month, 1 - startingDay);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    const weeks = [];
    for (let i = 0; i < 42; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    return weeks;
  });

  getBookingsForDate(date: Date) {
    return this.mockBookings.filter(b => 
      b.date.getDate() === date.getDate() && 
      b.date.getMonth() === date.getMonth() && 
      b.date.getFullYear() === date.getFullYear()
    );
  }

  nextMonth() {
    if (this.currentMonth() === 11) {
      this.currentMonth.set(0);
      this.currentYear.update(y => y + 1);
    } else {
      this.currentMonth.update(m => m + 1);
    }
  }

  prevMonth() {
    if (this.currentMonth() === 0) {
      this.currentMonth.set(11);
      this.currentYear.update(y => y - 1);
    } else {
      this.currentMonth.update(m => m - 1);
    }
  }

  selectDate(date: Date) {
    this.selectedDate.set(date);
  }

  isSameDay(d1: Date, d2: Date) {
    if (!d1 || !d2) return false;
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'confirmed': return 'bg-emerald-500';
      case 'pending': return 'bg-amber-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-rose-500';
      default: return 'bg-gray-500';
    }
  }
}
