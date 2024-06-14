import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoService } from './info.service';

@Injectable({
  providedIn: 'root'
})
export class TatuajeService {
  private apiUrl = 'tatuajes'; // Cambia la URL a tu endpoint real

  constructor(private http: HttpClient, private infoService: InfoService) {
    this.apiUrl = this.infoService.getAuthUrl()+this.apiUrl;
  }

  guardarTatuaje(tatuaje: any): Observable<any> {

  // Obtener el token de localStorage (o de donde lo tengas almacenado)
  const token = localStorage.getItem('token'); // Asumiendo que el token está en localStorage

  // Crear los encabezados HTTP con el token
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  // Hacer la solicitud POST con los encabezados
  return this.http.post(this.apiUrl, tatuaje, { headers: headers });
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