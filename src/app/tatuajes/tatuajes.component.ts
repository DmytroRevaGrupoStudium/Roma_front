import { Component } from '@angular/core';
import { TatuajeService } from '../services/tatuaje.service';
import { Tatuaje } from '../models/tatuaje';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tatuajes',
  templateUrl: './tatuajes.component.html',
  styleUrl: './tatuajes.component.css'
})
export class TatuajesComponent {
  tatuajes!: any[];


  constructor(
    private tatuajeService: TatuajeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Obtener los productos del servicio al inicializar el componente
    this.tatuajeService.getTatuajes().subscribe(tatuajes => {
      this.tatuajes = tatuajes;
    });
  }

  // Método para configurar el desvío de usuario a componente de vista_tatuaje
  verMas(tatuaje: Tatuaje): void {
    if (tatuaje && tatuaje.id) {
      this.router.navigate(['/vista_tatuaje', tatuaje.id]);
    } else {
      console.error('El objeto de producto es nulo o indefinido, o no tiene un ID válido.');
    }
  }
}
