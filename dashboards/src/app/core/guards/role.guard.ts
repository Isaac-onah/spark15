import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredPermissions = route.data['permissions'] as string[] | undefined;
  
  if (!requiredPermissions || requiredPermissions.length === 0) return true;
  
  const hasAccess = requiredPermissions.some(p => authService.hasPermission(p));
  if (!hasAccess) {
    router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};
