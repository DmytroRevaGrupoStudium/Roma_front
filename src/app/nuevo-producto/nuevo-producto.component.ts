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

  formularioProducto!: FormGroup;

  imagenPrincipal: string = '';
  imagenesAdicionales: string[] = [];

  tiposDeProductos: TipoProducto[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
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
        
        if (index === 0) {
          this.imagenPrincipal = result;
        } else if (index >= 1 && index <= 4) {
          this.imagenesAdicionales[index - 1] = result;
        }
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

    // Crear el array de imágenes según el formato deseado
    const imagenesParaGuardar: string[] = [this.imagenPrincipal];
    for (let i = 0; i < this.imagenesAdicionales.length; i++) {
        imagenesParaGuardar.push(this.imagenesAdicionales[i]);
    }

    productoDatos.imagenes = imagenesParaGuardar;

    // Llama al servicio para guardar el producto
    this.productoService.guardarProducto(productoDatos).subscribe({
      next: response => {
        console.log('Producto guardado:', response);
        window.location.reload();
      },
      error: error => {
        console.error('Error al guardar el producto:', error);
        // Manejo de errores: mostrar un mensaje al usuario, por ejemplo
      }
    });
  }

  hayImagenes(): boolean {
    // Verifica si la imagen principal no está vacía
    const imagenPrincipalNoVacia = this.imagenPrincipal.trim() !== '';
  
    // Verifica si hay al menos una imagen adicional que no esté vacía
    const algunaImagenAdicionalNoVacia = this.imagenesAdicionales.some(image => image.trim() !== '');
  
    // Devuelve true si la imagen principal no está vacía o si hay al menos una imagen adicional que no está vacía
    return imagenPrincipalNoVacia || algunaImagenAdicionalNoVacia;
  }

}