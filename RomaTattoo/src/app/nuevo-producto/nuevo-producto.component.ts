import { Component, ViewChild, ElementRef } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { TipoProductoService } from '../services/tipo-producto.service';
import { TipoProducto } from '../models/tipo-producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent {

  formularioProducto!: FormGroup; // Definir el FormGroup

  imagenes: string[] = [];

  tiposDeProductos: TipoProducto[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder, // Inyectar FormBuilder
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService
  ) {
    this.formularioProducto = this.fb.group({
      nombreProducto: ['', [Validators.required, Validators.maxLength(20)]],
      descripcionCorta: ['', [Validators.maxLength(50)]],
      descripcionLarga: ['', [Validators.maxLength(100)]],
      precio: [0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // Validar números con máximo 2 decimales
      tipoProducto: ['', [Validators.required, Validators.pattern(/^(?!Seleccione...).+$/)]], // Validar que no sea "Seleccione..."
    });

    // Al inicializar el componente, obtenemos todos los tipos de productos
    this.tipoProductoService.getTiposProducts().subscribe(tipos => {
      this.tiposDeProductos = tipos;
    });
  }

  ngAfterViewInit() {}

  openFilePicker(index: number) {
    const fileInputElement = this.fileInput.nativeElement;
    fileInputElement.setAttribute('data-index', index.toString());
    fileInputElement.click();
  }

  handleFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    const index = +fileInput.getAttribute('data-index')!;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const imageElements = document.querySelectorAll('.small-image');
        if (imageElements[index]) {
          imageElements[index].setAttribute('src', result);
        }
        // Almacena la imagen en base64
        this.imagenes[index] = result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarProducto() {
    if (this.formularioProducto.invalid) {
        // Si el formulario no es válido, muestra un mensaje de error o resalta los campos incorrectos
        return;
    }

    // Obtener los datos del formulario
    const productoDatos = this.formularioProducto.value;
    productoDatos.imagenes = this.imagenes;

    // Llama al servicio para guardar el producto
    this.productoService.guardarProducto(productoDatos).subscribe({
        next: response => {
            console.log('Producto guardado:', response);
        },
        error: error => {
            console.error('Error al guardar el producto:', error);
        }
    });
}

todasLasImagenesPredeterminadas(): boolean {
  return this.imagenes.every((image: string) => image === 'addImage.png');
}
}