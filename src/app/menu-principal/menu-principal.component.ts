import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';
import { Producto } from '../models/producto';
import { TipoProductoService } from '../services/tipo-producto.service';

declare var $: any;

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {
  products!: any[];
  tiposProductos!: any[];

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private tipoProductoService: TipoProductoService
  ) {}

  ngOnInit(): void {
    // Obtener los productos del servicio al inicializar el componente
    this.productoService.getProducts().subscribe(products => {
      this.products = products;
    });

    this.tipoProductoService.getTiposProducts().subscribe(tiposProductos => {
      this.tiposProductos = tiposProductos;
    });
  }

  verMas(product: Producto): void {
    if (product && product.id) {
      console.log(product.id);
      this.router.navigate(['/vista_producto', product.id]);
    } else {
      console.error('El objeto de producto es nulo o indefinido, o no tiene un ID válido.');
    }
  }
}
