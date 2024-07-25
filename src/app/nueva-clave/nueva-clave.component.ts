import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva-clave',
  templateUrl: './nueva-clave.component.html',
  styleUrls: ['./nueva-clave.component.css']
})
export class NuevaClaveComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.restablecerClave();
  }

  private restablecerClave() {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];

      Swal.fire({
        title: 'Ingresa tu nueva contraseña',
        input: 'password',
        inputAttributes: {
          autocapitalize: 'off'
        },
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        showCancelButton:true,
        showLoaderOnConfirm: true,
        preConfirm: async (newPass: string) => {
          // Validar la nueva contraseña con un FormControl
          const passwordControl = new FormControl(newPass, [
            Validators.required, // Validador para campo requerido
            this.authService.passwordValidator // Validador de fortaleza de contraseña
          ]);

          // Obtener el mensaje de error del validador
          const error = passwordControl.hasError('passwordStrength') ? passwordControl.getError('passwordStrength') : null;

          if (error) {
            Swal.showValidationMessage(error);
            return false;
          }

          return newPass;
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          const newPass = result.value;

          this.authService.changePassword(email, newPass).subscribe({
            next: (response: any) => {
              Swal.fire({
                title: '¡Éxito!',
                text: response.message || 'Tu contraseña se restableció correctamente.',
                icon: 'success',
                confirmButtonText: 'Ir al inicio de sesión'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/auth']);
                }
              });
            },
            error: (error) => {
              console.error('Error recibido:', error);

              const errorMessage = error?.error?.message || 'No se pudo restablecer la contraseña. Inténtalo de nuevo más tarde.';

              Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              }).then(() => {
                this.restablecerClave();
              });
            }
          });
        }
        else
        {
          this.router.navigate(['/auth']);
        }
      });
    });
  }
}