import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private apiUrl = 'http://172.29.192.13:8080/api/'; // Cambia la URL a tu endpoint real
  private dirInfo = 'informacion'

  constructor(private http: HttpClient) {}

   getInformacion(): Observable<any[]> {
    // Realizar la solicitud HTTP para obtener los productos desde la API
    return this.http.get<any[]>(`${this.apiUrl}${this.dirInfo}`);
  }

  getAuthUrl(): string {
    return `${this.apiUrl}`; // Ejemplo de método para obtener la URL de autenticación
  }
}
