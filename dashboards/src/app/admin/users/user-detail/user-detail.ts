import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, StatusBadge, Breadcrumb],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  
  activeTab = signal<'overview' | 'bookings' | 'activity'>('overview');
  isEditing = signal(false);
  adminNotes = signal('User verified phone number on 2023-01-16.');
  
  userId = signal('');

  user = signal({
    id: '1',
    firstName: 'Ahmed',
    lastName: 'Ali',
    name: 'Ahmed Ali',
    email: 'ahmed@example.com',
    phone: '+49 151 2345678',
    location: 'Kreuzberg, Berlin',
    address: 'Skalitzer Str. 123, 10999 Berlin',
    profileStatus: 'complete',
    accountStatus: 'active',
    joinDate: '2023-01-15',
    totalBookings: 12,
    totalSpent: 450,
    lastLogin: '2023-10-25 14:30',
    bio: 'Software developer looking for occasional local services.'
  });

  bookings = signal([
    { id: 'B-1029', providerName: 'Amina F.', service: 'Tailoring', date: '2023-10-20', amount: 45, status: 'completed' },
    { id: 'B-0982', providerName: 'Hassan B.', service: 'Handyman', date: '2023-09-15', amount: 120, status: 'completed' },
    { id: 'B-0855', providerName: 'Elena R.', service: 'Cleaning', date: '2023-08-02', amount: 60, status: 'completed' },
    { id: 'B-1150', providerName: 'Tarik M.', service: 'IT Services', date: '2023-11-05', amount: 85, status: 'pending' }
  ]);

  activityLog = signal([
    { date: '2023-10-25 14:30', action: 'Logged in', details: 'IP: 192.168.1.1' },
    { date: '2023-10-20 10:15', action: 'Booking Completed', details: 'Booking B-1029 marked as completed' },
    { date: '2023-10-18 09:00', action: 'Booking Created', details: 'Created booking B-1029' },
    { date: '2023-09-15 16:45', action: 'Left Review', details: '5 stars for Hassan B.' }
  ]);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId.set(id);
      }
    });
  }

  setTab(tab: 'overview' | 'bookings' | 'activity') {
    this.activeTab.set(tab);
  }

  saveNotes() {
    console.log('Saved notes:', this.adminNotes());
  }
}