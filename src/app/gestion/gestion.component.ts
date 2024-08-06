import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TatuajeService } from '../services/tatuaje.service';
import { InfoService } from '../services/info.service';
import { ProductoService } from '../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoProductoService } from '../services/tipo-producto.service';

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
    private tipoProductoService: TipoProductoService
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
      else if (this.nombreElemento === 'tipos_productos')
      {
      // Obtener los tatuajes del servicio al inicializar el componente
      this.tipoProductoService.getTiposProducts().subscribe(tipos => {
        this.elementos = tipos;
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

  gestionarElemento(id: any) {
    if(this.nombreElemento === 'productos')
      {
        // Mandar a ventana de nuevo producto con id en parametros
        
      }
      else if (this.nombreElemento === 'tatuajes')
      {
      // Mandar a ventana de nuevo tatuaje con id en parametros
      this.tatuajesService.getTatuajes().subscribe(tatuajes => {
        this.elementos = tatuajes;
      });
      }
      else
      {
      // Mandar a ventana de nueva información con id en parametros
      this.informacionService.getInformacion().subscribe(info => {
        this.elementos = info;
      });
      }
  }
}
