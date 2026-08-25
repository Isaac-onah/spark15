import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class Login {
  email = '';
  password = '';
  isLoading = signal<boolean>(false);

  constructor(private authService: AuthService, private router: Router, private toast: ToastService) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.toast.error('Validation Error', 'Please enter both email and password.');
      return;
    }

    this.isLoading.set(true);
    
    // Simulate slight network delay
    setTimeout(() => {
      const success = this.authService.login(this.email, this.password);
      
      if (success) {
        this.toast.success('Login Successful', 'Welcome back to the dashboard.');
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.toast.error('Login Failed', 'Invalid credentials.');
        this.isLoading.set(false);
      }
    }, 600);
  }
}
