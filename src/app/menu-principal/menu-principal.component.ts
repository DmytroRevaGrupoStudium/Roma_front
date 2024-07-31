import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { TipoProductoService } from '../services/tipo-producto.service';
import { TatuajeService } from '../services/tatuaje.service';
import { InfoService } from '../services/info.service';

declare var $: any;

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {
  products!: any[];
  tiposProductos!: any[];
  tatuajes!: any[];
  informacion: any = {};

  constructor(
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService,
    private tatuajeService: TatuajeService,
    private infoService: InfoService
  ) {}

  ngOnInit(): void {
    // Obtener los productos del servicio al inicializar el componente
    this.productoService.getProducts().subscribe(products => {
      this.products = products;

      // Filtrar productos para el carrusel de productos
      this.filterProductosCarrousel();
    });

    // Consultar información general, productos y tatuajes
    this.tipoProductoService.getTiposProducts().subscribe(tiposProductos => {
      this.tiposProductos = tiposProductos;
    });

    this.tatuajeService.getTatuajes().subscribe(tatuajes => {
      this.tatuajes = tatuajes;
    });
  }

  // Método de filtración de productos
  filterProductosCarrousel(): void {
    const imagenesCarrouselProductos: any[] = [];
    const tipoProductosVistos = new Set<string>();

    // Iterar sobre los productos y agregar al carrousel hasta tener 5 productos diferentes
    this.products.forEach(producto => {
      if (tipoProductosVistos.size < 5 && !tipoProductosVistos.has(producto.tipoProducto)) {
        tipoProductosVistos.add(producto.tipoProducto);
        imagenesCarrouselProductos.push(producto);
      }
    });

    this.products = imagenesCarrouselProductos;
  }
}
