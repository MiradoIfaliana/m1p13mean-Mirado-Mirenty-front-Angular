import { HttpInterceptorFn, HttpErrorResponse, HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { NotificationService } from '../../shared/services/notification.service';

export const forbiddenInterceptor: HttpInterceptorFn = (req, next) => {
  const snack = inject(MatSnackBar);
  const router = inject(Router);
  const auth = inject(AuthService);
  const notifToast = inject(NotificationService)

  // On laisse passer la requête, et on attrape les erreurs après
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // On cible 401 (Unauthorized) et 403 (Forbidden)
      if (err.status === 401 || err.status === 403) {
        console.error('Auth error intercepted:', err);

        // Affiche un toast

        // snack.open(
        //   err.status === 401 ? 'Session expirée — reconnectez-vous.' : 'Accès refusé.',
        //   'Fermer',
        //   { duration: 4000, panelClass: ['error-snackbar'] }
        // );

        notifToast.showError('Erreur d\'authentification.');

        // Tentative optionnelle de logout côté serveur sans déclencher d'autres interceptors :
        try {
            auth.logout();
        } catch (e) {
          // ignore si impossible :car il est probable que le token qu'il utilise est déjà expiré
        }
        // Nettoyage local du token + redirection
        auth.clearToken();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};


