import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { Pagination } from '../../../shared/components/pagination/pagination';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, Pagination],
  templateUrl: './audit-log.component.html'
})
export class AuditLogComponent {
  private toastService = inject(ToastService);
  
  logs = signal([
    { id: 1, timestamp: '2023-10-24 14:30:22', admin: 'Isaac Onah', role: 'super_admin', action: 'Update Settings', target: 'PlatformConfig', diff: '{"minHourlyRate": [12, 15]}', ip: '192.168.1.1', expanded: false },
    { id: 2, timestamp: '2023-10-24 13:15:00', admin: 'Sarah Müller', role: 'admin', action: 'Approve Provider', target: 'User #4211', diff: '{"status": ["pending", "active"]}', ip: '192.168.1.2', expanded: false },
    { id: 3, timestamp: '2023-10-23 18:45:11', admin: 'Ahmad Hassan', role: 'moderator', action: 'Delete Review', target: 'Review #882', diff: 'Deleted record', ip: '192.168.1.3', expanded: false },
    { id: 4, timestamp: '2023-10-23 11:20:05', admin: 'Isaac Onah', role: 'super_admin', action: 'Toggle Feature Flag', target: 'SMS_NOTIFICATIONS', diff: '{"enabled": [true, false]}', ip: '192.168.1.1', expanded: false },
    { id: 5, timestamp: '2023-10-22 09:10:44', admin: 'Elena Petrova', role: 'moderator', action: 'Suspend User', target: 'User #9932', diff: '{"status": ["active", "suspended"]}', ip: '192.168.1.4', expanded: false }
  ]);

  filters = { admin: '', action: '', date: '' };

  exportLog() {
    this.toastService.success('Success', 'Audit log export started. You will receive an email shortly.');
  }
}
