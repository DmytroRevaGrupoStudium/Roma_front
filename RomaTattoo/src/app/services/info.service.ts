import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private apiUrl = 'http://172.29.192.13:8080/informacion'; // Cambia la URL a tu endpoint real

  constructor(private http: HttpClient) {}

   getInformacion(): Observable<any[]> {
    // Realizar la solicitud HTTP para obtener los productos desde la API
    return this.http.get<any[]>(this.apiUrl);
  }
}
