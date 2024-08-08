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
  styleUrl: './gestion.component.css',
})
export class GestionComponent implements OnInit {

  elementos: any[] = [];
  nombreElemento: any;

  constructor(
    private productoService: ProductoService,
    private tatuajesService: TatuajeService,
    private informacionService: InfoService,
    private route: ActivatedRoute,
    private router: Router,
    private tipoProductoService: TipoProductoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.nombreElemento = params.get('elemento');
      if (!this.nombreElemento) {
        this.router.navigate(['/menu_principal']);
        return;
      }
  
      this.loadData();
    });
  }

  loadData(): void {
    Swal.fire({
      title: 'Cargando...',
      allowEscapeKey: true,
      allowOutsideClick: false,
      timerProgressBar: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    if (this.nombreElemento === 'productos') {
      this.productoService.getProducts().subscribe((products) => {
        this.elementos = products;
        Swal.close();
      });
    } else if (this.nombreElemento === 'tatuajes') {
      this.tatuajesService.getTatuajes().subscribe((tatuajes) => {
        this.elementos = tatuajes;
        Swal.close();
      });
    } else if (this.nombreElemento === 'tipos_productos') {
      this.tipoProductoService.getTiposProducts().subscribe((tipos) => {
        this.elementos = tipos;
        Swal.close();
      });
    } else {
      this.informacionService.getInformacion().subscribe((info) => {
        this.elementos = info;
        Swal.close();
      });
    }
  }
  

  editarElemento(id: any) {
    if (this.nombreElemento === 'productos') {
      // Mandar a ventana de nuevo producto con id en parametros
    } else if (this.nombreElemento === 'tatuajes') {
      // Mandar a ventana de nuevo tatuaje con id en parametros
    } else if (this.nombreElemento === 'tipos_productos') {
      // Mandar a ventana de nuevo tipoProducto con id en parametros
    } else {
      // Mandar a ventana de nueva información con id en parametros
    }
  }

  eliminarElemento(id: any) {
    if (this.nombreElemento === 'productos') {
      // Eliminar con su servicio correspondiente a elemento por su id
    } else if (this.nombreElemento === 'tatuajes') {
      // Eliminar con su servicio correspondiente a elemento por su id
    } else if (this.nombreElemento === 'tipos_productos') {
      // Eliminar con su servicio correspondiente a elemento por su id
    } else {
      // Eliminar con su servicio correspondiente a elemento por su id
    }
  }

  formatString(input: string, upperCaseFirstLetter: boolean): string {
    let formattedString = input.replace(/[^a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ]/g, ' ');

    if (upperCaseFirstLetter) {
      formattedString = formattedString
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase();
      formattedString =
        formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
    } else {
      formattedString = formattedString
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase();
      formattedString =
        formattedString.charAt(0).toLowerCase() + formattedString.slice(1);
    }

    return formattedString;
  }

  nuevoElemento() 
  {
    if (this.nombreElemento === 'productos') {
      // Mandar a ventana de nuevo producto
      this.router.navigate(["/nuevo_producto"]);
    } else if (this.nombreElemento === 'tatuajes') {
      // Mandar a ventana de nuevo tatuaje
      this.router.navigate(["/nuevo_tatuaje"]);
    } else if (this.nombreElemento === 'tipos_productos') {
      // Mandar a ventana de nuevo tipoProducto
      this.router.navigate(["/nuevo_tipo_producto"]);
    } else {
      // Mandar a ventana de nueva información
      this.router.navigate(["/nueva_informacion"]);
    }
  }
}
