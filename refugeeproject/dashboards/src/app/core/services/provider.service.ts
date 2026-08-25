import { Injectable, signal, computed } from '@angular/core';
import { Provider } from '../models';

@Injectable({ providedIn: 'root' })
export class ProviderService {
  private providersData: Provider[] = [
    { id: 'P1', name: 'Fatima S.', email: 'fatima@provider.com', category: 'Tailoring', languages: ['Arabic', 'German'], hourlyRate: 25, rating: 4.8, reviewCount: 34, verificationStatus: 'verified', status: 'active', featured: true, joinDate: '2023-01-20' },
    { id: 'P2', name: 'Ahmad K.', email: 'ahmad@provider.com', category: 'Handyman', languages: ['Farsi', 'German', 'English'], hourlyRate: 35, rating: 4.5, reviewCount: 22, verificationStatus: 'verified', status: 'active', featured: false, joinDate: '2023-02-15' },
    { id: 'P3', name: 'Maryam H.', email: 'maryam@provider.com', category: 'Cooking & Catering', languages: ['Arabic', 'English'], hourlyRate: 40, rating: 4.9, reviewCount: 45, verificationStatus: 'verified', status: 'active', featured: true, joinDate: '2023-03-10' },
    { id: 'P4', name: 'Yonas T.', email: 'yonas@provider.com', category: 'Tutoring', languages: ['Tigrinya', 'German'], hourlyRate: 20, rating: 4.2, reviewCount: 15, verificationStatus: 'pending', status: 'active', featured: false, joinDate: '2023-04-05' },
    { id: 'P5', name: 'Hassan A.', email: 'hassan@provider.com', category: 'IT Services', languages: ['Arabic', 'English', 'German'], hourlyRate: 65, rating: 5.0, reviewCount: 12, verificationStatus: 'verified', status: 'active', featured: false, joinDate: '2023-05-22' },
    { id: 'P6', name: 'Amira B.', email: 'amira@provider.com', category: 'Beauty & Hair', languages: ['Arabic'], hourlyRate: 30, rating: 4.6, reviewCount: 28, verificationStatus: 'verified', status: 'active', featured: true, joinDate: '2023-06-18' },
    { id: 'P7', name: 'Dawit M.', email: 'dawit@provider.com', category: 'Cleaning', languages: ['Tigrinya', 'English'], hourlyRate: 15, rating: 4.1, reviewCount: 8, verificationStatus: 'unverified', status: 'active', featured: false, joinDate: '2023-07-12' },
    { id: 'P8', name: 'Zahra R.', email: 'zahra@provider.com', category: 'Translation', languages: ['Farsi', 'German'], hourlyRate: 45, rating: 4.7, reviewCount: 31, verificationStatus: 'verified', status: 'active', featured: false, joinDate: '2023-08-30' },
    { id: 'P9', name: 'Omar J.', email: 'omar@provider.com', category: 'Handyman', languages: ['Somali', 'German'], hourlyRate: 28, rating: 3.8, reviewCount: 5, verificationStatus: 'pending', status: 'suspended', featured: false, joinDate: '2023-09-14' },
    { id: 'P10', name: 'Leila N.', email: 'leila@provider.com', category: 'Childcare', languages: ['Arabic', 'French', 'German'], hourlyRate: 22, rating: 4.9, reviewCount: 40, verificationStatus: 'verified', status: 'active', featured: true, joinDate: '2023-10-01' },
    { id: 'P11', name: 'Rashid D.', email: 'rashid@provider.com', category: 'Music & Arts', languages: ['Arabic', 'English'], hourlyRate: 50, rating: 4.4, reviewCount: 10, verificationStatus: 'unverified', status: 'active', featured: false, joinDate: '2023-11-20' }
  ];

  private providersSignal = signal<Provider[]>(this.providersData);
  providers = computed(() => this.providersSignal());

  getProviders() { return this.providersSignal(); }
  getProviderById(id: string) { return this.providersSignal().find(p => p.id === id); }
  
  updateProvider(id: string, data: Partial<Provider>) {
    this.providersSignal.update(providers => providers.map(p => p.id === id ? { ...p, ...data } : p));
  }
  
  toggleFeatured(id: string) {
    const p = this.getProviderById(id);
    if(p) this.updateProvider(id, { featured: !p.featured });
  }
  
  suspendProvider(id: string) {
    this.updateProvider(id, { status: 'suspended' });
  }
  
  getByCategory(category: string) {
    return this.providersSignal().filter(p => p.category === category);
  }
  
  getStats() {
    const providers = this.providersSignal();
    return {
      total: providers.length,
      verified: providers.filter(p => p.verificationStatus === 'verified').length,
      pending: providers.filter(p => p.verificationStatus === 'pending').length,
      active: providers.filter(p => p.status === 'active').length,
      avgRating: providers.reduce((acc, p) => acc + p.rating, 0) / providers.length
    };
  }
}
