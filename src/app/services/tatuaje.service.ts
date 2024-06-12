import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TatuajeService {
  private apiUrl = 'http://172.29.192.13:8080/tatuajes'; // Cambia la URL a tu endpoint real

  constructor(private http: HttpClient) {}

  guardarTatuaje(tatuaje: any): Observable<any> {
    return this.http.post(this.apiUrl, tatuaje);
  }

  getTatuajes(): Observable<any[]> {
    // Realizar la solicitud HTTP para obtener los productos desde la API
    return this.http.get<any[]>(this.apiUrl);
  }

  getTatuajeById(tatuajeID: string): Observable<any>
  {
    return this.http.get<any>(this.apiUrl+'/'+tatuajeID);
  }
}