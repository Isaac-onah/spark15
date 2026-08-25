import { Injectable } from '@angular/core';
import { ChartData } from '../models';

@Injectable({ providedIn: 'root' })
export class ReportService {
  
  getUserRegistrationData(): ChartData[] {
    return [
      { label: 'Jan', value: 15 },
      { label: 'Feb', value: 25 },
      { label: 'Mar', value: 40 },
      { label: 'Apr', value: 35 },
      { label: 'May', value: 50 },
      { label: 'Jun', value: 65 }
    ];
  }
  
  getProviderPerformanceData(): ChartData[] {
    return [
      { label: '5 Stars', value: 45 },
      { label: '4 Stars', value: 30 },
      { label: '3 Stars', value: 15 },
      { label: '2 Stars', value: 5 },
      { label: '1 Star', value: 5 }
    ];
  }
  
  getRevenueData(): ChartData[] {
    return [
      { label: 'Q1', value: 12000 },
      { label: 'Q2', value: 15500 },
      { label: 'Q3', value: 18000 },
      { label: 'Q4', value: 22000 }
    ];
  }
  
  getBookingFunnelData(): ChartData[] {
    return [
      { label: 'Searches', value: 1000 },
      { label: 'Profile Views', value: 600 },
      { label: 'Inquiries', value: 350 },
      { label: 'Bookings', value: 150 },
      { label: 'Completed', value: 120 }
    ];
  }
  
  getCategoryPopularityData(): ChartData[] {
    return [
      { label: 'Tailoring', value: 25 },
      { label: 'Handyman', value: 20 },
      { label: 'Cooking & Catering', value: 15 },
      { label: 'Translation', value: 15 },
      { label: 'IT Services', value: 10 },
      { label: 'Other', value: 15 }
    ];
  }
  
  getLocationActivityData(): ChartData[] {
    return [
      { label: 'Mitte', value: 120 },
      { label: 'Kreuzberg', value: 95 },
      { label: 'Neukölln', value: 110 },
      { label: 'Friedrichshain', value: 85 },
      { label: 'Wedding', value: 70 }
    ];
  }
}
