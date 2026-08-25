import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Breadcrumb } from '../../../shared/components/breadcrumb/breadcrumb';
import { StatusBadge } from '../../../shared/components/status-badge/status-badge';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';
import { TruncatePipe } from '../../../core/pipes/truncate.pipe';

@Component({
  selector: 'app-chat-flags',
  standalone: true,
  imports: [CommonModule, Breadcrumb, StatusBadge, TimeAgoPipe, TruncatePipe],
  templateUrl: './chat-flags.html',
  styleUrl: './chat-flags.css'
})
export class ChatFlagsComponent {
  chats = signal([
    { id: 'c1', participant1Name: 'Ali Reza', participant2Name: 'Maria Klein', flagReason: 'personal_info', lastMessagePreview: 'My phone number is 0157 888 999...', messageCount: 14, flaggedAt: new Date(Date.now() - 1000 * 60 * 30), status: 'open' },
    { id: 'c2', participant1Name: 'Fatima Noor', participant2Name: 'Johannes Weber', flagReason: 'off_platform_payment', lastMessagePreview: 'Can I just pay you in cash when you arrive?', messageCount: 5, flaggedAt: new Date(Date.now() - 1000 * 60 * 120), status: 'open' },
    { id: 'c3', participant1Name: 'Amir Hassan', participant2Name: 'Stefan Bauer', flagReason: 'threats', lastMessagePreview: 'If you do not refund me I will...', messageCount: 32, flaggedAt: new Date(Date.now() - 1000 * 60 * 60 * 5), status: 'reviewed' },
    { id: 'c4', participant1Name: 'Layla Youssef', participant2Name: 'Anna Schmidt', flagReason: 'abuse', lastMessagePreview: 'You are completely incompetent!', messageCount: 8, flaggedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), status: 'open' },
    { id: 'c5', participant1Name: 'Omar Khaled', participant2Name: 'Tom Becker', flagReason: 'personal_info', lastMessagePreview: 'Just email me directly at omar@...', messageCount: 12, flaggedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), status: 'dismissed' }
  ]);

  selectedChat = signal<any | null>(null);

  mockThread = [
    { sender: 'Ali Reza', timestamp: new Date(Date.now() - 1000 * 60 * 40), text: 'Hello, when can you come fix the sink?' },
    { sender: 'Maria Klein', timestamp: new Date(Date.now() - 1000 * 60 * 38), text: 'I can come tomorrow at 2 PM.' },
    { sender: 'Ali Reza', timestamp: new Date(Date.now() - 1000 * 60 * 35), text: 'Perfect. My phone number is 0157 888 999. Call me when you arrive.', flagged: true },
    { sender: 'System', timestamp: new Date(Date.now() - 1000 * 60 * 34), text: 'Warning: Sharing personal contact information is against our policy.', isSystem: true }
  ];

  viewChat(chat: any) {
    this.selectedChat.set(chat);
  }

  closeModal() {
    this.selectedChat.set(null);
  }

  dismissFlag(id: string) {
    this.chats.update(cs => cs.map(c => c.id === id ? { ...c, status: 'dismissed' } : c));
  }

  escalateFlag(id: string) {
    // Escalate logic
  }
}
