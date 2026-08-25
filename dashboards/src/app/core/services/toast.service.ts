import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: number;
  type: ToastType;
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<ToastMessage[]>([]);
  private counter = 0;

  show(type: ToastType, title: string, message: string, duration = 3000) {
    const id = this.counter++;
    const toast: ToastMessage = { id, type, title, message };
    
    this.toasts.update(t => [...t, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  success(title: string, message: string, duration = 3000) {
    this.show('success', title, message, duration);
  }

  error(title: string, message: string, duration = 4000) {
    this.show('error', title, message, duration);
  }
  
  info(title: string, message: string, duration = 3000) {
    this.show('info', title, message, duration);
  }

  remove(id: number) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}
