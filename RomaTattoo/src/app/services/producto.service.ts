import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://172.29.192.13:8080/productos'; // Cambia la URL a tu endpoint real

  constructor(private http: HttpClient) {}

  guardarProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  getProducts(): Observable<any[]> {
    // Realizar la solicitud HTTP para obtener los productos desde la API
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductById(productId: string): Observable<any>
  {
    return this.http.get<any>(this.apiUrl+'/'+productId);
  }
}