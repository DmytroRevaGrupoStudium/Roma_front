import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';
import Swal from 'sweetalert2';

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

    // Sacamos el id de los parametros
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      // Consultamos toda la info sobre el producto
      this.productoService.getProductById(productId).subscribe(product => {
        this.product = product;
        // Seleccionamos la primera imagen por defecto
        this.selectImage(this.product.imagenes[0]);
      });
    }
  }  

  // Método para seleccionar la imagen principal
  selectImage(image: string): void {
    this.selectedImage = image;
  }

  abrirImg() {
    Swal.fire({
      imageUrl: this.selectedImage,
      imageAlt: 'Imagen seleccionada',
      showCloseButton: true,
      showConfirmButton: false
    });
  }
}