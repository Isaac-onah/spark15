import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrls: ['./confirm-modal.css']
})
export class ConfirmModal {
  isOpen = input.required<boolean>();
  title = input('Confirm Action');
  message = input('Are you sure you want to proceed?');
  confirmText = input('Confirm');
  cancelText = input('Cancel');
  variant = input<'danger' | 'warning' | 'info'>('danger');
  isLoading = input(false);
  
  confirmed = output<void>();
  cancelled = output<void>();
}
