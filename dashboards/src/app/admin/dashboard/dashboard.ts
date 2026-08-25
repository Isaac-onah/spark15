import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatCard } from '../../shared/components/stat-card/stat-card';
import { StatusBadge } from '../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, StatCard, StatusBadge],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  stats = {
    totalUsers: 1452,
    totalProviders: 384,
    activeBookings: 124,
    totalRevenue: 45280,
    escrowBalance: 12500,
    platformFees: 4528,
    pendingVerifications: 15,
    openDisputes: 3,
    openTickets: 8
  };

  recentActivity = [
    { id: 1, type: 'registration', title: 'New User Registration', description: 'Ahmed Ali joined as a user', time: '10 mins ago', status: 'success' },
    { id: 2, type: 'booking', title: 'New Booking', description: 'Cooking Service booked by Sarah J.', time: '25 mins ago', status: 'info' },
    { id: 3, type: 'verification', title: 'Provider Verification', description: 'Fatima N. submitted documents', time: '1 hour ago', status: 'warning' },
    { id: 4, type: 'dispute', title: 'Dispute Raised', description: 'Issue reported on Booking #4029', time: '2 hours ago', status: 'error' },
    { id: 5, type: 'registration', title: 'New Provider Registration', description: 'Yusuf K. joined as a provider', time: '3 hours ago', status: 'success' },
    { id: 6, type: 'booking', title: 'Booking Completed', description: 'Handyman Service for John D.', time: '4 hours ago', status: 'success' },
    { id: 7, type: 'ticket', title: 'Support Ticket', description: 'Login issue reported by Maria S.', time: '5 hours ago', status: 'warning' },
    { id: 8, type: 'review', title: 'New Review', description: '5-star rating for Tailoring Service', time: '6 hours ago', status: 'info' }
  ];

  topProviders = [
    { id: 1, name: 'Amina F.', category: 'Tailoring', rating: 4.9, reviews: 124, revenue: 3200 },
    { id: 2, name: 'Tarik M.', category: 'IT Services', rating: 4.8, reviews: 98, revenue: 4100 },
    { id: 3, name: 'Elena R.', category: 'Cleaning', rating: 4.8, reviews: 156, revenue: 2800 },
    { id: 4, name: 'Hassan B.', category: 'Handyman', rating: 4.7, reviews: 82, revenue: 3500 },
    { id: 5, name: 'Sofia L.', category: 'Tutoring', rating: 4.7, reviews: 64, revenue: 1900 }
  ];
}