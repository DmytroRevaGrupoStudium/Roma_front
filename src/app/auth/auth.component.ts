import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserTiendaService } from '../services/user-tienda.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  formMode: 'login' | 'register' = 'login';

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private userTiendaService: UserTiendaService, private router: Router, private fb: FormBuilder) {
    
    // Validadores
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, authService.passwordValidator]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  switchToLogin() {
    this.formMode = 'login';
  }

  switchToRegister() {
    this.formMode = 'register';
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/menu_principal');
          this.authService.updateAuthStatus(true);
          this.clearData();
        },
        error: (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Se ha producido un error al iniciar sesión",
            text: error.error.message,
          });
          this.clearData();
        }
      });
    }
  }

  onSubmitRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          this.switchToLogin();
          Swal.fire({
            title: "¡Su cuenta ha sido creada exitosamente!",
            text: "Se le ha enviado un correo a "+this.registerForm.value.email+", confirme su cuenta.",
            icon: "success"
          });
          this.clearData();
        },
        error: (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Se ha producido un error al registrarse",
            text: error.error.message,
          });
          this.clearData();
        }
      });
    }
  }

  clearData() {
    this.loginForm.reset();
    this.registerForm.reset();
  }

  restablecerPassword() {
    Swal.fire({
      title: 'Escriba su correo electrónico',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Recuperar contraseña',
      cancelButtonText: 'Volver',
      showLoaderOnConfirm: true,
      preConfirm: async (email: string) => {
        // Crear un FormControl para validar el correo electrónico
        const emailControl = new FormControl(email, [Validators.required, Validators.email]);
  
        // Verificar si el correo electrónico es válido
        if (emailControl.invalid) {
          // Mostrar un mensaje de validación y evitar la confirmación
          Swal.showValidationMessage('Por favor, introduzca un correo electrónico válido');
          return false; // Asegúrate de que el modal no se confirme si el correo es inválido
        }
        // Si el correo electrónico es válido, devolverlo para su uso posterior
        return email;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        // Obtener el correo electrónico del resultado
        const email = result.value;
  
        // Suscribirse al método del servicio que maneja la recuperación de contraseña
        this.userTiendaService.enviarCorreoPassword(email).subscribe({
          next: (response: any) => {
            Swal.fire({
              title: 'Correo electrónico enviado',
              text: `Se le ha enviado un correo electrónico a ${email} para recuperar su contraseña.`,
              icon: 'success'
            });
          },
          error: (error: any) => {
            Swal.fire({
              icon: "error",
              title: "Se ha producido un error",
              text: error.message,
            });
          }
        });
      }
    });
  }
}