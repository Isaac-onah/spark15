export interface PlatformConfig {
  platformName: string;
  currency: string;
  defaultLanguage: string;
  supportedLanguages: string[];
  minHourlyRate: number;
  maxHourlyRate: number;
  escrowHoldDurationDays: number;
  autoCancelTimeoutHours: number;
  profileCompletionRequired: boolean;
  providerApprovalRequired: boolean;
  reviewMinLength: number;
  reviewModerationMode: 'auto_approve' | 'manual_approve' | 'auto_flag';
  platformFeeAmount: number;
  platformFeeType: 'flat' | 'percentage' | 'tiered';
  maintenanceMode: boolean;
  maintenanceMessage?: string;
}

export interface ServiceCategoryConfig {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  displayOrder: number;
  subServices: string[];
}

export interface LocationConfig {
  id: string;
  name: string;
  neighborhood: string;
  enabled: boolean;
}
