import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { InfoService } from './info.service';
import { JwtHelperService } from '@auth0/angular-jwt';

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

    console.log("Token: "+token)

    const isAuthenticated = !!token; // Verifica que token tenga un valor válido
  
    return of(isAuthenticated);
  }
  
  isAdmin(): Observable<boolean> {
    const token = localStorage.getItem('token');

    console.log("Token: "+token)

    if (token) {


      const tokenPayload = this.jwtHelper.decodeToken(token);


      console.log("Decodificó")

      const isAdmin = tokenPayload.rol === 'ADMIN';

      if (isAdmin) {
        console.log("Usuario ADMIN");
      } else {
        console.log("Usuario USER");
      }

      return of(isAdmin)
    } else {
      return of(false);
    }
  }

  updateAuthStatus(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }
}