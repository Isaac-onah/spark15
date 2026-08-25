import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
})
export class Settings implements OnInit {
  activeTab = 'profile';
  isSaving = signal(false);
  
  profileData = {
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(public authService: AuthService, private toast: ToastService) {}

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user) {
      // Split name into first and last for the form
      const parts = user.name.split(' ');
      this.profileData.firstName = parts[0] || '';
      this.profileData.lastName = parts.slice(1).join(' ') || '';
      this.profileData.email = user.email;
    }
  }

  saveProfile() {
    if (!this.profileData.firstName) {
      this.toast.error('Validation Error', 'First name is required.');
      return;
    }
    
    this.isSaving.set(true);
    
    // Simulate network request
    setTimeout(() => {
      this.toast.success('Profile Saved', 'Your personal details have been updated successfully.');
      this.isSaving.set(false);
    }, 800);
  }
}
