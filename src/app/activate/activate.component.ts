import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTiendaService } from '../services/user-tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService: UserTiendaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el parámetro 'email' de los parámetros de consulta (queryParams)
    this.route.queryParams.subscribe(params => {
      const email = params['email'];

      // En caso de llamada al método con email vacío devolvemos al user a menú principal
      if (typeof email === 'undefined') {
        this.router.navigate(['/menu_principal']);
        return;
      }

      // Accedemos a método de activación de usuario por su email
      this.userService.activateUser(email).subscribe({
        // Manejamos respuestas
        next: (response: any) => {
          // Mostrar un mensaje de éxito con SweetAlert2
          Swal.fire({
            title: '¡Éxito!',
            text: response.message || 'Tu cuenta ha sido activada correctamente.',
            icon: 'success',
            confirmButtonText: 'Ir al login'
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirigir al usuario al login si el botón de confirmación es presionado
              this.router.navigate(['/auth']);
            }
          });
        },
        error: (error) => {
          // Revisar la estructura del error recibido y extraer el mensaje
          const errorMessage = error?.error?.message || 'No se pudo activar la cuenta. Por favor, inténtalo de nuevo más tarde.';

          // Mostrar un mensaje de error con SweetAlert2
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Redirigir al usuario a una página de inicio
            this.router.navigate(['/menu_principal']);
          });
        }
      });
    });
  }
}