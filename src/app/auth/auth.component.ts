import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  formMode: 'login' | 'register' = 'login';

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
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
  }

  clearData() {
    this.loginForm.reset();
    this.registerForm.reset();
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasMinLength = value.length >= 6;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const passwordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    return !passwordValid ? { passwordStrength: 'La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.' } : null;
  }
}