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
      },
      error: (error: any) => {
        console.error('Error en el login:', error);
      }
    });
  }

  onSubmitRegister() {
    this.authService.register(this.registerData).subscribe({
      next: (response: any) => {
        console.log('Registro exitoso', response);
        this.switchToLogin();

        Swal.fire({
          title: "¡Su cuenta ha sido creada exitosamente!",
          text: "Inicie sesión para acceder a su cuenta",
          icon: "success"
        });
        
      },
      error: (error: any) => {
        // Manejar error en el registro
        console.error('Error en el registro', error);
      }
    });
  }
}