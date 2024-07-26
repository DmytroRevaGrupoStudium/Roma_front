import { Component } from '@angular/core';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  // Variable para albergar información a mostrar en HTML
  informacion: any = {};
  
  constructor(
    private infoService: InfoService,
  ) {
    // Suscribimos al response de servicio
    this.infoService.getInformacion().subscribe(datos => {
      datos.forEach(item => {
        this.informacion[item.dato] = item.valor;
      });
    });
  }

}
