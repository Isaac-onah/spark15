import { Routes } from '@angular/router';
import { Layout } from './shared/layout/layout';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.Login)
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: 'admin',
        children: [
          // Dashboard
          { path: 'dashboard', loadComponent: () => import('./admin/dashboard/dashboard').then(m => m.DashboardComponent) },
          
          // Users
          { path: 'users', loadComponent: () => import('./admin/users/user-list/user-list').then(m => m.UserListComponent) },
          { path: 'users/:id', loadComponent: () => import('./admin/users/user-detail/user-detail').then(m => m.UserDetailComponent) },
          
          // Providers
          { path: 'providers', loadComponent: () => import('./admin/providers/provider-list/provider-list').then(m => m.ProviderListComponent) },
          { path: 'providers/verification-queue', loadComponent: () => import('./admin/providers/verification-queue/verification-queue').then(m => m.VerificationQueue) },
          { path: 'providers/:id', loadComponent: () => import('./admin/providers/provider-detail/provider-detail').then(m => m.ProviderDetailComponent) },
          
          // Bookings
          { path: 'bookings', loadComponent: () => import('./admin/bookings/booking-list/booking-list').then(m => m.BookingList) },
          { path: 'bookings/calendar', loadComponent: () => import('./admin/bookings/booking-calendar/booking-calendar').then(m => m.BookingCalendar) },
          { path: 'bookings/:id', loadComponent: () => import('./admin/bookings/booking-detail/booking-detail').then(m => m.BookingDetail) },
          
          // Financials
          { path: 'financials/overview', loadComponent: () => import('./admin/financials/financial-overview/financial-overview').then(m => m.FinancialOverview) },
          { path: 'financials/transactions', loadComponent: () => import('./admin/financials/transaction-ledger/transaction-ledger').then(m => m.TransactionLedger) },
          { path: 'financials/payouts', loadComponent: () => import('./admin/financials/payouts/payouts').then(m => m.Payouts) },
          { path: 'financials/refunds', loadComponent: () => import('./admin/financials/refunds/refunds').then(m => m.Refunds) },
          { path: 'financials/fee-config', loadComponent: () => import('./admin/financials/fee-config/fee-config').then(m => m.FeeConfig) },
          
          // Moderation
          { path: 'moderation/reviews', loadComponent: () => import('./admin/moderation/review-queue/review-queue').then(m => m.ReviewQueueComponent) },
          { path: 'moderation/chats', loadComponent: () => import('./admin/moderation/chat-flags/chat-flags').then(m => m.ChatFlagsComponent) },
          { path: 'moderation/profiles', loadComponent: () => import('./admin/moderation/profile-flags/profile-flags').then(m => m.ProfileFlagsComponent) },
          
          // Disputes
          { path: 'disputes', loadComponent: () => import('./admin/disputes/dispute-list/dispute-list').then(m => m.DisputeListComponent) },
          { path: 'disputes/:id', loadComponent: () => import('./admin/disputes/dispute-detail/dispute-detail').then(m => m.DisputeDetailComponent) },
          
          // Support
          { path: 'support', loadComponent: () => import('./admin/support/ticket-list/ticket-list').then(m => m.TicketListComponent) },
          { path: 'support/:id', loadComponent: () => import('./admin/support/ticket-detail/ticket-detail').then(m => m.TicketDetailComponent) },
          
          // Reports
          { path: 'reports/pre-built', loadComponent: () => import('./admin/reports/pre-built/pre-built.component').then(m => m.PreBuiltComponent) },
          { path: 'reports/custom', loadComponent: () => import('./admin/reports/custom/custom.component').then(m => m.CustomComponent) },
          
          // Notifications
          { path: 'notifications', loadComponent: () => import('./admin/notifications/notifications.component').then(m => m.NotificationsComponent) },
          
          // Team
          { path: 'team', loadComponent: () => import('./admin/team/team-list/team-list.component').then(m => m.TeamListComponent) },
          { path: 'team/audit-log', loadComponent: () => import('./admin/team/audit-log/audit-log.component').then(m => m.AuditLogComponent) },
          
          // Settings
          { path: 'settings/platform-config', loadComponent: () => import('./admin/settings/platform-config/platform-config.component').then(m => m.PlatformConfigComponent) },
          { path: 'settings/categories', loadComponent: () => import('./admin/settings/categories/categories.component').then(m => m.CategoriesComponent) },
          { path: 'settings/locations', loadComponent: () => import('./admin/settings/locations/locations.component').then(m => m.LocationsComponent) },
          { path: 'settings/feature-flags', loadComponent: () => import('./admin/settings/feature-flags/feature-flags.component').then(m => m.FeatureFlagsComponent) },
          { path: 'settings/email-templates', loadComponent: () => import('./admin/settings/email-templates/email-templates.component').then(m => m.EmailTemplatesComponent) },
          { path: 'settings/translations', loadComponent: () => import('./admin/settings/translations/translations.component').then(m => m.TranslationsComponent) },
          
          // Legal
          { path: 'legal/privacy-policy', loadComponent: () => import('./admin/legal/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) },
          { path: 'legal/content-policy', loadComponent: () => import('./admin/legal/content-policy/content-policy.component').then(m => m.ContentPolicyComponent) },
          
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      },
      { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
