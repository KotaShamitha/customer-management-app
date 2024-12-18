import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = this.authService.getRole();
    if (role) {
      const requiredRole = route.data['role'];
      if (!requiredRole || role === requiredRole) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
