import { Component, ViewChild, ElementRef } from '@angular/core';
import { TatuajeService } from '../services/tatuaje.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-tatuaje',
  templateUrl: './nuevo-tatuaje.component.html',
  styleUrl: './nuevo-tatuaje.component.css'
})
export class NuevoTatuajeComponent {
  formularioTatuaje!: FormGroup; // Definir el FormGroup

  imagenPrincipal: string = '';
  imagenesAdicionales: string[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder, // Inyectar FormBuilder
    private tatuajeService: TatuajeService
  ) {
    this.formularioTatuaje = this.fb.group({
      nombreTatuaje: ['', [Validators.required, Validators.maxLength(20)]],
      descripcion: ['', [Validators.maxLength(50)]],
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

  guardarTatuaje() {
    if (this.formularioTatuaje.invalid) {
      // Si el formulario no es válido, muestra un mensaje de error o resalta los campos incorrectos
      return;
    }

    // Obtener los datos del formulario
    const tatuajeDatos = this.formularioTatuaje.value;

    // Crear el array de imágenes según el formato deseado
    const imagenesParaGuardar: string[] = [this.imagenPrincipal];
    for (let i = 0; i < this.imagenesAdicionales.length; i++) {
        imagenesParaGuardar.push(this.imagenesAdicionales[i]);
    }

    tatuajeDatos.imagenes = imagenesParaGuardar;

    // Llama al servicio para guardar el Tatuaje
    this.tatuajeService.guardarTatuaje(tatuajeDatos).subscribe({
        next: response => {
            console.log('Tatuaje guardado:', response);
            window.location.reload();
        },
        error: error => {
            console.error('Error al guardar el Tatuaje:', error);
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