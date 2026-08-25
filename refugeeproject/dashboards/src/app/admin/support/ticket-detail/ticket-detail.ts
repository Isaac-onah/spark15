import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, Breadcrumb, StatusBadge, TimeAgoPipe],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.css'
})
export class TicketDetailComponent {
  ticketId = signal<string>('TKT-1041');
  replyText = signal('');
  isInternal = signal(false);

  ticket = signal({
    id: 'TKT-1041',
    subject: 'Payout not received',
    status: 'in_progress',
    priority: 'high',
    category: 'Billing',
    assignedTo: 'Admin Sarah',
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 12),
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2),
    user: {
      name: 'Amina Tailoring',
      type: 'Provider',
      email: 'amina@example.com',
      memberSince: new Date('2023-01-15')
    },
    messages: [
      { id: 1, sender: 'Amina Tailoring', isStaff: false, text: 'Hello, my payout from last week\'s booking (BK-1025) has not arrived in my bank account yet. It usually takes 2 days.', date: new Date(Date.now() - 1000 * 60 * 60 * 12) },
      { id: 2, sender: 'Admin Sarah', isStaff: true, isInternal: true, text: 'Checked Stripe dashboard. The payout failed due to invalid bank account details.', date: new Date(Date.now() - 1000 * 60 * 60 * 10) },
      { id: 3, sender: 'Admin Sarah', isStaff: true, text: 'Hi Amina, I looked into this for you. It seems the payout failed because the bank account details on file are invalid. Could you please double-check your IBAN in your account settings?', date: new Date(Date.now() - 1000 * 60 * 60 * 10) },
      { id: 4, sender: 'Amina Tailoring', isStaff: false, text: 'Oh I see, my bank merged with another recently. I have updated the IBAN now. Can you retry?', date: new Date(Date.now() - 1000 * 60 * 60 * 2) }
    ]
  });

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.ticketId.set(params['id']);
      }
    });
  }

  sendReply() {
    if (!this.replyText().trim()) return;
    this.ticket.update(t => {
      t.messages.push({
        id: Date.now(),
        sender: 'You',
        isStaff: true,
        isInternal: this.isInternal(),
        text: this.replyText(),
        date: new Date()
      });
      return { ...t };
    });
    this.replyText.set('');
    this.isInternal.set(false);
  }

  useCannedResponse(text: string) {
    this.replyText.set(text);
  }

  changeStatus(event: Event) {
    const status = (event.target as HTMLSelectElement).value;
    this.ticket.update(t => ({ ...t, status }));
  }
}
