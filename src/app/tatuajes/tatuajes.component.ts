import { Component } from '@angular/core';
import { TatuajeService } from '../services/tatuaje.service';
import { InfoService } from '../services/info.service';
import { Tatuaje } from '../models/tatuaje';
import { Router } from '@angular/router';

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
    private infoService: InfoService,
    private router: Router,
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

  verMas(tatuaje: Tatuaje): void {
    if (tatuaje && tatuaje.id) {
      console.log(tatuaje.id);
      this.router.navigate(['/vista_tatuaje', tatuaje.id]);
    } else {
      console.error('El objeto de producto es nulo o indefinido, o no tiene un ID válido.');
    }
  }
}
