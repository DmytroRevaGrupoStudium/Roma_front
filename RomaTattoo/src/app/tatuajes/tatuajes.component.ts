import { Component } from '@angular/core';
import { TatuajeService } from '../services/tatuaje.service';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-tatuajes',
  templateUrl: './tatuajes.component.html',
  styleUrl: './tatuajes.component.css'
})
export class TatuajesComponent {
  tatuajes!: any[];
  informacion: any = {};

  constructor(
    private tatuajeService: TatuajeService,
    private infoService: InfoService
  ) {
    this.infoService.getInformacion().subscribe(datos => {
      datos.forEach(item => {
        this.informacion[item.dato] = item.valor;
      });
    });
  }

  ngOnInit(): void {
    // Obtener los productos del servicio al inicializar el componente
    this.tatuajeService.getTatuajes().subscribe(tatuajes => {
      this.tatuajes = tatuajes;
    });
  }
}
