import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { RolesEnum } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRole = next.data["expectedRole"]; // Obtener el rol esperado de los datos adjuntos a la ruta
  
    const userRole = this.authService.hasRole();
  
    if (userRole !== expectedRole) {
      // Si el rol del usuario no es el esperado, redirigir a una página de acceso denegado o a otra ruta
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  }
