import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfoService } from './info.service';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  private apiUrl = 'tipo_productos';

  constructor(private http: HttpClient, private infoService: InfoService) {
    this.apiUrl = this.infoService.getAuthUrl()+this.apiUrl;
  }

  // Realizar la solicitud HTTP para guardar los productos desde la API
  guardarTipoProducto(tipoProducto: any): Observable<any> {

  const token = localStorage.getItem('token');

  // Crear los encabezados HTTP con el token
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

    // Hacer la solicitud POST con los encabezados
    return this.http.post(this.apiUrl, tipoProducto, { headers: headers});
  }

  getTiposProducts(): Observable<any[]> {
    // Realizar la solicitud HTTP para obtener los productos desde la API
    return this.http.get<any[]>(this.apiUrl);
  }
}