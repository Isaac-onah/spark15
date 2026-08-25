import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, StatusBadge],
  templateUrl: './team-list.component.html'
})
export class TeamListComponent {
  private toastService = inject(ToastService);
  
  team = signal([
    { id: 1, name: 'Isaac Onah', email: 'isaac@spark15.com', role: 'super_admin', status: 'active', lastLogin: '10 mins ago', actionsCount: 1542, avatar: 'IO' },
    { id: 2, name: 'Sarah Müller', email: 'sarah@spark15.com', role: 'admin', status: 'active', lastLogin: '2 hours ago', actionsCount: 853, avatar: 'SM' },
    { id: 3, name: 'Ahmad Hassan', email: 'ahmad@spark15.com', role: 'moderator', status: 'active', lastLogin: '1 day ago', actionsCount: 312, avatar: 'AH' },
    { id: 4, name: 'Elena Petrova', email: 'elena@spark15.com', role: 'moderator', status: 'active', lastLogin: '3 days ago', actionsCount: 421, avatar: 'EP' },
    { id: 5, name: 'Tom Schmidt', email: 'tom@spark15.com', role: 'support_agent', status: 'pending', lastLogin: 'Never', actionsCount: 0, avatar: 'TS' }
  ]);

  isInviteModalOpen = signal(false);
  isEditModalOpen = signal(false);
  editingUser = signal<any>(null);
  inviteData = { email: '', role: 'moderator' };

  inviteAdmin() {
    this.toastService.success('Success', `Invitation sent to ${this.inviteData.email}`);
    this.isInviteModalOpen.set(false);
    this.inviteData = { email: '', role: 'moderator' };
  }

  editRole(user: any) {
    this.editingUser.set({...user});
    this.isEditModalOpen.set(true);
  }

  saveRole() {
    this.toastService.success('Success', 'Role updated successfully');
    this.isEditModalOpen.set(false);
  }

  disableAdmin(user: any) {
    this.toastService.success('Success', `Admin ${user.name} disabled`);
  }
}
