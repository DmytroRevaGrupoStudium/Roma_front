import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TatuajeService } from '../services/tatuaje.service';
import { InfoService } from '../services/info.service';
import { ProductoService } from '../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.css'
})
export class GestionComponent implements OnInit{

  elementos: any[] = [];
  nombreElemento: any;

  constructor(
    private productoService: ProductoService,
    private tatuajesService: TatuajeService,
    private informacionService: InfoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    
  }

  ngOnInit(): void {

    Swal.fire({
      title: "Cargando...",
      allowEscapeKey: true,
      allowOutsideClick: false,
      timerProgressBar: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

      this.route.paramMap.subscribe(params => {
        this.nombreElemento = params.get('elemento');
        if (!this.nombreElemento) {
          this.router.navigate(['/menu_principal']);
          return;
        }
      });

      // Verificar elementos a gestionar
      if(this.nombreElemento === 'productos')
      {
        // Obtener los productos del servicio al inicializar el componente
        this.productoService.getProducts().subscribe(products => {
          this.elementos = products;
        });
      }
      else if (this.nombreElemento === 'tatuajes')
      {
      // Obtener los tatuajes del servicio al inicializar el componente
      this.tatuajesService.getTatuajes().subscribe(tatuajes => {
        this.elementos = tatuajes;
      });
      }
      else
      {
      // Obtener la información del servicio al inicializar el componente
      this.informacionService.getInformacion().subscribe(info => {
        this.elementos = info;
      });
      }

      Swal.close();
  }

  modificarElemento(elemento:any): void
  {
    // Verificar elemento a modificar
    if(this.nombreElemento === 'productos')
      {
        // Modificar los productos
        
      }
      else if (this.nombreElemento === 'tatuajes')
      {
        // Modificar los tatuajes
        
      }
      else
      {
        // Modificar la información
      
      }
  }

  eliminarElemento(elemento:any): void
  {
  // Verificar elemento a eliminar
  if(this.nombreElemento === 'productos')
    {
      // Eliminar los productos
      
    }
    else if (this.nombreElemento === 'tatuajes')
    {
      // Eliminar los tatuajes
    
    }
    else
    {
      // Eliminar la información
    
    }
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj).map(key => {
      // Formatear la clave del objeto
      return key.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + key.slice(1);
    });
  }

  getImageValue(obj: any): string {
    if (obj.startsWith('data:image/png;base64,')) {
      return obj.split(',')[1]; // Obtener solo el valor de la imagen
    }
    return obj;
  }

  getValues(obj: any): [string, string][] {
    // Implement to return an array of key-value pairs
    return Object.entries(obj);
  }

  formatPrice(price: string): string {
    return price + "€";
  }
}
