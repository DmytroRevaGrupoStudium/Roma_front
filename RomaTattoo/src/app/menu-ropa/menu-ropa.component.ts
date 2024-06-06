import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductoService } from '../services/producto.service';
import { Router } from '@angular/router';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-menu-ropa',
  templateUrl: './menu-ropa.component.html',
  styleUrls: ['./menu-ropa.component.css']
})
export class MenuRopaComponent implements OnInit {
  products!: any[];
  filterTypes: { name: string, selected: BehaviorSubject<boolean> }[] = [];
  filteredProducts!: any[];

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener los productos del servicio al inicializar el componente
    this.productoService.getProducts().subscribe(products => {
      this.products = products;
      this.initializeFilters();
    });
  }

  initializeFilters(): void {
    // Obtener tipos únicos de productos
    const uniqueTypes = this.getUniqueTypes();
    
    // Inicializar filterTypes con tipos únicos
    this.filterTypes = uniqueTypes.map(type => ({
      name: type,
      selected: new BehaviorSubject<boolean>(false)
    }));

    // Inicialmente, mostrar todos los productos
    this.filteredProducts = this.products;
  }

  filterProducts(type: string): void {
    // Marcar el tipo seleccionado y filtrar productos
    this.filterTypes.forEach(filter => filter.selected.next(filter.name === type));
    this.filteredProducts = this.products.filter(product => product.tipoProducto === type);
  }

  getUniqueTypes(): string[] {
    // Obtener tipos únicos de productos
    return [...new Set(this.products.map(product => product.tipoProducto))];
  }

  resetFilters(): void {
    // Restablecer los filtros y mostrar todos los productos
    this.filterTypes.forEach(filter => filter.selected.next(false));
    this.filteredProducts = this.products;
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