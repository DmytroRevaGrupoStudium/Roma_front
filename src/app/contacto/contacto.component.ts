import { Component } from '@angular/core';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  informacion: any = {};
  
  constructor(
    private infoService: InfoService,
  ) {
    this.infoService.getInformacion().subscribe(datos => {
      datos.forEach(item => {
        this.informacion[item.dato] = item.valor;
      });
    });
  }

}
