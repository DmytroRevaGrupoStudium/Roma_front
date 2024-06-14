import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CanActivateFn } from '@angular/router';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.tokenValidation().pipe(
    switchMap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigateByUrl('/auth');
        return of(false);
      } else {
        // Verificar el rol de administrador antes de permitir acceso a rutas específicas
        if (state.url.includes('/nuevo_')) {
          return authService.isAdmin().pipe(
            map(isAdmin => {
              if (!isAdmin) {
                router.navigateByUrl('/');
                return false;
              }
              return true;
            }),
            catchError(() => {
              router.navigateByUrl('/');
              return of(false);
            })
          );
        }
        return of(true);
      }
    }),
    catchError(() => {
      router.navigateByUrl('/auth');
      return of(false);
    })
  );
};