import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post(this.apiUrl, tipoProducto);
  }

  getTiposProducts(): Observable<any[]> {
    // Realizar la solicitud HTTP para obtener los productos desde la API
    return this.http.get<any[]>(this.apiUrl);
  }
}