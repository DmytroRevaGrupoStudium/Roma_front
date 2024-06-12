import { Component } from '@angular/core';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

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
