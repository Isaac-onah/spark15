import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { ProviderService } from '../../../core/services/provider.service';
import { ToastService } from '../../../core/services/toast.service';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';

@Component({
  selector: 'app-verification-queue',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, StatusBadge, TimeAgoPipe],
  templateUrl: './verification-queue.html',
  styleUrls: ['./verification-queue.css']
})
export class VerificationQueue {
  private toastService = inject(ToastService);
  private providerService = inject(ProviderService);

  breadcrumbs = [
    { label: 'Dashboard', route: '/admin' },
    { label: 'Providers', route: '/admin/providers' },
    { label: 'Verification Queue', route: '/admin/providers/verification-queue' }
  ];

  requests = signal<any[]>([
    { id: '1', name: 'Fatima S.', email: 'fatima@example.com', category: 'Cooking & Catering', status: 'pending', submittedAt: new Date(Date.now() - 2 * 86400000), docs: { id: 'id1.jpg', card: 'card1.jpg' }, reviewer: 'Unassigned' },
    { id: '2', name: 'Ahmad K.', email: 'ahmad@example.com', category: 'IT Services', status: 'under_review', submittedAt: new Date(Date.now() - 5 * 86400000), docs: { id: 'id2.jpg', card: 'card2.jpg' }, reviewer: 'Admin Alex' },
    { id: '3', name: 'Maryam H.', email: 'maryam@example.com', category: 'Tailoring', status: 'pending', submittedAt: new Date(Date.now() - 1 * 86400000), docs: { id: 'id3.jpg', card: 'card3.jpg' }, reviewer: 'Unassigned' },
    { id: '4', name: 'Yonas T.', email: 'yonas@example.com', category: 'Tutoring', status: 'pending', submittedAt: new Date(Date.now() - 3 * 86400000), docs: { id: 'id4.jpg', card: 'card4.jpg' }, reviewer: 'Unassigned' },
    { id: '5', name: 'Zahra R.', email: 'zahra@example.com', category: 'Beauty & Hair', status: 'more_info', submittedAt: new Date(Date.now() - 7 * 86400000), docs: { id: 'id5.jpg', card: 'card5.jpg' }, reviewer: 'Admin Alex' },
    { id: '6', name: 'Hassan A.', email: 'hassan@example.com', category: 'Translation', status: 'pending', submittedAt: new Date(), docs: { id: 'id6.jpg', card: 'card6.jpg' }, reviewer: 'Unassigned' },
    { id: '7', name: 'Amira B.', email: 'amira@example.com', category: 'Childcare', status: 'under_review', submittedAt: new Date(Date.now() - 4 * 86400000), docs: { id: 'id7.jpg', card: 'card7.jpg' }, reviewer: 'Admin Sarah' }
  ]);

  filterStatus = signal('all');
  
  filteredRequests = computed(() => {
    const status = this.filterStatus();
    const reqs = this.requests();
    if (status === 'all') return reqs;
    return reqs.filter(r => r.status === status);
  });

  selectedRequest = signal<any | null>(null);
  isDocumentViewerOpen = signal(false);
  isRejectModalOpen = signal(false);
  rejectionReason = signal('');
  reviewNotes = signal('');

  checklist = signal([
    { id: 'c1', label: 'Photo matches name', checked: false },
    { id: 'c2', label: 'Document not expired', checked: false },
    { id: 'c3', label: 'Membership card valid', checked: false },
    { id: 'c4', label: 'Face clearly visible', checked: false }
  ]);

  setFilter(status: string) {
    this.filterStatus.set(status);
  }

  viewRequest(req: any) {
    this.selectedRequest.set(req);
    this.isDocumentViewerOpen.set(true);
  }

  closeViewer() {
    this.isDocumentViewerOpen.set(false);
    this.selectedRequest.set(null);
  }

  openReject() {
    this.isRejectModalOpen.set(true);
  }

  closeReject() {
    this.isRejectModalOpen.set(false);
    this.rejectionReason.set('');
  }

  approve() {
    const req = this.selectedRequest();
    if (req) {
      this.updateStatus(req.id, 'active');
      this.toastService.success('Success', 'Provider approved');
      this.closeViewer();
    }
  }

  reject() {
    const req = this.selectedRequest();
    if (req) {
      this.updateStatus(req.id, 'rejected');
      this.toastService.error('Error', 'Provider rejected');
      this.closeReject();
      this.closeViewer();
    }
  }

  requestMoreInfo() {
    const req = this.selectedRequest();
    if (req) {
      this.updateStatus(req.id, 'more_info');
      this.toastService.info('Info', 'Requested more info');
      this.closeViewer();
    }
  }

  updateStatus(id: string, status: string) {
    this.requests.update(reqs => 
      reqs.map(r => r.id === id ? { ...r, status } : r)
    );
  }
}
