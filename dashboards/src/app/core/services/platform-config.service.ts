import { Injectable, signal, computed } from '@angular/core';
import { PlatformConfig, Category, Location, FeatureFlag } from '../models';

@Injectable({ providedIn: 'root' })
export class PlatformConfigService {
  private initialConfig: PlatformConfig = {
    platformName: 'Spark 15',
    currency: 'EUR',
    defaultLanguage: 'de',
    supportedLanguages: ['de', 'en', 'ar', 'ti', 'fa', 'so'],
    minHourlyRate: 10,
    maxHourlyRate: 100,
    escrowHoldDurationDays: 14,
    autoCancelTimeoutHours: 48,
    profileCompletionRequired: true,
    providerApprovalRequired: true,
    reviewMinLength: 20,
    reviewModerationMode: 'auto_flag',
    platformFeeAmount: 1,
    platformFeeType: 'flat',
    categories: [
      { id: 'C1', name: 'Tailoring', active: true },
      { id: 'C2', name: 'Cooking & Catering', active: true },
      { id: 'C3', name: 'Tutoring', active: true },
      { id: 'C4', name: 'IT Services', active: true },
      { id: 'C5', name: 'Translation', active: true },
      { id: 'C6', name: 'Cleaning', active: true },
      { id: 'C7', name: 'Beauty & Hair', active: true },
      { id: 'C8', name: 'Handyman', active: true },
      { id: 'C9', name: 'Childcare', active: true },
      { id: 'C10', name: 'Music & Arts', active: true }
    ],
    locations: [
      { id: 'L1', name: 'Mitte', active: true },
      { id: 'L2', name: 'Kreuzberg', active: true },
      { id: 'L3', name: 'Neukölln', active: true },
      { id: 'L4', name: 'Friedrichshain', active: true },
      { id: 'L5', name: 'Prenzlauer Berg', active: true },
      { id: 'L6', name: 'Wedding', active: true },
      { id: 'L7', name: 'Moabit', active: true },
      { id: 'L8', name: 'Charlottenburg', active: true },
      { id: 'L9', name: 'Schöneberg', active: true },
      { id: 'L10', name: 'Tempelhof', active: true }
    ],
    featureFlags: [
      { key: 'enable_escrow', enabled: true, description: 'Enable escrow payments' },
      { key: 'enable_crypto', enabled: false, description: 'Enable crypto payments' },
      { key: 'auto_approve_providers', enabled: false, description: 'Auto-approve new providers' },
      { key: 'show_provider_ratings', enabled: true, description: 'Show ratings on provider profiles' },
      { key: 'enable_disputes', enabled: true, description: 'Enable dispute resolution center' },
      { key: 'maintenance_mode', enabled: false, description: 'Put platform in maintenance mode' },
      { key: 'beta_features', enabled: false, description: 'Enable beta features for admins' }
    ]
  };

  private configSignal = signal<PlatformConfig>(this.initialConfig);
  config = computed(() => this.configSignal());

  getConfig() { return this.configSignal(); }
  
  updateConfig(partial: Partial<PlatformConfig>) {
    this.configSignal.update(c => ({ ...c, ...partial }));
  }
  
  getCategories() { return this.configSignal().categories; }
  updateCategory(id: string, data: Partial<Category>) {
    this.configSignal.update(c => ({
      ...c,
      categories: c.categories.map(cat => cat.id === id ? { ...cat, ...data } : cat)
    }));
  }
  
  getLocations() { return this.configSignal().locations; }
  
  getFeatureFlags() { return this.configSignal().featureFlags; }
  toggleFeatureFlag(key: string) {
    this.configSignal.update(c => ({
      ...c,
      featureFlags: c.featureFlags.map(f => f.key === key ? { ...f, enabled: !f.enabled } : f)
    }));
  }
}
