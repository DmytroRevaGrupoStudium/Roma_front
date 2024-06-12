import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-vista-producto',
  templateUrl: './vista-producto.component.html',
  styleUrls: ['./vista-producto.component.css']
})
export class VistaProductoComponent implements OnInit {
  product!: Producto;

  selectedImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}
  
  ngOnInit(): void {

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productoService.getProductById(productId).subscribe(product => {
        this.product = product;
        this.selectImage(this.product.imagenes[0]);
      });
    }
  }  

  selectImage(image: string): void {
    this.selectedImage = image;
  }
}