import { Injectable, signal, computed } from '@angular/core';
import { FlaggedReview } from '../models';

@Injectable({ providedIn: 'root' })
export class ModerationService {
  private flaggedReviewsData: FlaggedReview[] = [
    { id: 'F-301', reviewId: 'R-1', providerId: 'P2', providerName: 'Ahmad K.', userId: 'U1', userName: 'Hans Müller', content: 'Terrible service, completely useless! *@$#', flagReason: 'profanity', status: 'pending', createdAt: '2024-03-05T10:00:00Z' },
    { id: 'F-302', reviewId: 'R-2', providerId: 'P5', providerName: 'Hassan A.', userId: 'U6', userName: 'Fatima Ahmed', content: 'Click here to make easy money: http://spam.link', flagReason: 'spam', status: 'removed', createdAt: '2024-03-10T12:00:00Z' },
    { id: 'F-303', reviewId: 'R-3', providerId: 'P7', providerName: 'Dawit M.', userId: 'U8', userName: 'Zahra Noori', content: 'He was very rude and made inappropriate comments.', flagReason: 'harassment', status: 'pending', createdAt: '2024-03-15T14:00:00Z' },
    { id: 'F-304', reviewId: 'R-4', providerId: 'P9', providerName: 'Omar J.', userId: 'U4', userName: 'Tariq Hassan', content: 'I think this account is a bot.', flagReason: 'suspicious', status: 'approved', createdAt: '2024-03-20T16:00:00Z' },
    { id: 'F-305', reviewId: 'R-5', providerId: 'P1', providerName: 'Fatima S.', userId: 'U3', userName: 'Jürgen Schmidt', content: 'Fake reviews here, do not trust!', flagReason: 'suspicious', status: 'pending', createdAt: '2024-03-25T09:00:00Z' },
    { id: 'F-306', reviewId: 'R-6', providerId: 'P4', providerName: 'Yonas T.', userId: 'U11', userName: 'Lukas Becker', content: 'Buy cheap cryptos now!', flagReason: 'spam', status: 'pending', createdAt: '2024-04-01T11:00:00Z' },
    { id: 'F-307', reviewId: 'R-7', providerId: 'P6', providerName: 'Amira B.', userId: 'U2', userName: 'Amina Al-Fayed', content: 'She ruined my hair, absolutely terrible idiot.', flagReason: 'profanity', status: 'pending', createdAt: '2024-04-05T13:00:00Z' },
    { id: 'F-308', reviewId: 'R-8', providerId: 'P11', providerName: 'Rashid D.', userId: 'U10', userName: 'Mohammed Ali', content: 'Scammer alert!!!', flagReason: 'harassment', status: 'pending', createdAt: '2024-04-10T15:00:00Z' }
  ];

  private flaggedSignal = signal<FlaggedReview[]>(this.flaggedReviewsData);

  getFlaggedReviews() { return this.flaggedSignal(); }
  getAllReviews() { return []; }
  getFlaggedChats() { return []; }
  getFlaggedProfiles() { return []; }

  approveReview(id: string) {
    this.flaggedSignal.update(fs => fs.map(f => f.id === id ? { ...f, status: 'approved' } : f));
  }
  
  removeReview(id: string) {
    this.flaggedSignal.update(fs => fs.map(f => f.id === id ? { ...f, status: 'removed' } : f));
  }
  
  getStats() {
    const fs = this.flaggedSignal();
    return {
      totalFlagged: fs.length,
      pending: fs.filter(f => f.status === 'pending').length,
      removed: fs.filter(f => f.status === 'removed').length,
      approved: fs.filter(f => f.status === 'approved').length
    };
  }
}
