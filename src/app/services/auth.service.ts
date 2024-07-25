import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { InfoService } from './info.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'auth';
  
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public authChanged: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private infoService: InfoService, private jwtHelper: JwtHelperService) {
    this.apiUrl = this.infoService.getAuthUrl() + this.apiUrl;

    this.tokenValidation().subscribe({
      next: (isAuthenticated) => {
        this.isAuthenticatedSubject.next(isAuthenticated);
      }
    });
  }

  login(loginData: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }

  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData);
  }

  tokenValidation(): Observable<boolean> {
    const token = localStorage.getItem('token');

    const isAuthenticated = !!token; // Verifica que token tenga un valor válido
  
    return of(isAuthenticated);
  }
  
  isAdmin(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (token) {

      const tokenPayload = this.jwtHelper.decodeToken(token);

      const isAdmin = tokenPayload.rol === 'ADMIN';

      return of(isAdmin)
    } else {
      return of(false);
    }
  }

  updateAuthStatus(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  changePassword(email: any, newPass: any) {
    const params = new HttpParams()
    .set('email', email)
    .set('password', newPass);
    return this.http.get<any>(`${this.apiUrl}/reset_password`, { params });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

  if (!value) {
    return { passwordStrength: 'La contraseña es requerida.' };
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