import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';
import { CurrencyEurPipe } from '../../../core/pipes/currency-eur.pipe';

@Component({
  selector: 'app-dispute-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, StatusBadge, TimeAgoPipe, CurrencyEurPipe],
  templateUrl: './dispute-detail.html',
  styleUrl: './dispute-detail.css'
})
export class DisputeDetailComponent {
  disputeId = signal<string>('DSP-8492');
  resolutionText = signal('');
  internalNote = signal('');

  dispute = signal({
    id: 'DSP-8492',
    category: 'Tailoring',
    priority: 'high',
    status: 'under_investigation',
    assignedTo: 'Admin Sarah',
    slaTimerHours: 22,
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 2),
    client: { name: 'Lukas Meier', statement: 'The suit was completely ruined. The sleeves are way too short and the stitching is coming undone. I demanded a refund but the provider refused. I have attached photos as evidence.' },
    provider: { name: 'Amina Tailoring', statement: 'The client insisted on those measurements despite my professional advice. I completed the work exactly as requested. I offered to adjust it for a small fee but he became aggressive.' },
    booking: { id: 'BK-1029', service: 'Custom Suit Alteration', date: new Date(Date.now() - 1000 * 60 * 60 * 48), price: 150, escrowStatus: 'held' },
    timeline: [
      { type: 'created', text: 'Dispute opened by client', date: new Date(Date.now() - 1000 * 60 * 60 * 2) },
      { type: 'provider_response', text: 'Provider submitted response', date: new Date(Date.now() - 1000 * 60 * 30) },
      { type: 'status_change', text: 'Status changed to Under Investigation', date: new Date(Date.now() - 1000 * 60 * 15) }
    ],
    internalNotes: [
      { author: 'Admin Tom', text: 'Looking at the photos, the sleeves do seem unusually short. Will need to verify the original measurement request.', date: new Date(Date.now() - 1000 * 60 * 10) }
    ]
  });

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.disputeId.set(params['id']);
      }
    });
  }

  addInternalNote() {
    if (!this.internalNote().trim()) return;
    this.dispute.update(d => {
      d.internalNotes.push({
        author: 'You (Admin)',
        text: this.internalNote(),
        date: new Date()
      });
      return { ...d };
    });
    this.internalNote.set('');
  }

  resolveAction(action: string) {
    console.log('Action taken:', action);
  }
}
