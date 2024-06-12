import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  private apiUrl = 'http://172.29.192.13:8080/tipo_productos'; // Cambia la URL a tu endpoint real

  constructor(private http: HttpClient) {}

  guardarTipoProducto(tipoProducto: any): Observable<any> {
    return this.http.post(this.apiUrl, tipoProducto);
  }

  getTiposProducts(): Observable<any[]> {
    // Realizar la solicitud HTTP para obtener los productos desde la API
    return this.http.get<any[]>(this.apiUrl);
  }
}