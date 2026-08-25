import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-custom',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb],
  templateUrl: './custom.component.html'
})
export class CustomComponent {
  private toastService = inject(ToastService);
  
  metrics = { users: true, providers: false, bookings: true, revenue: false, ratings: false, responseTimes: false };
  dimension = 'day';
  dateRange = { start: '', end: '' };
  visualization = 'bar';

  isGenerated = signal(false);

  generateReport() {
    this.isGenerated.set(true);
    this.toastService.success('Success', 'Custom report generated');
  }

  saveReport() {
    this.toastService.success('Success', 'Report configuration saved');
  }

  exportCsv() {
    this.toastService.success('Success', 'Report exported');
  }
}
