import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Importa Router correctamente
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  formMode: 'login' | 'register' = 'login'; // Estado inicial del formulario

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    email: '',
    password: '',
    nombre: '',
    apellidos: '',
    telefono: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  switchToLogin() {
    this.formMode = 'login';
  }

  switchToRegister() {
    this.formMode = 'register';
  }

  onSubmitLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/menu_principal'); // Redirige a la ruta principal o a donde necesites
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

  onSubmitRegister() {
    this.authService.register(this.registerData).subscribe({
      next: (response: any) => {
         this.switchToLogin();

        Swal.fire({
          title: "¡Su cuenta ha sido creada exitosamente!",
          text: "Confirme su cuenta a través de mensaje en su email y luego inicie sesión para acceder a su cuenta",
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

  // Limpiar datos de los formularios
  clearData() {
    this.loginData = {
      email: '',
      password: ''
    };

    this.registerData = {
      email: '',
      password: '',
      nombre: '',
      apellidos: '',
      telefono: ''
    };
  }
}