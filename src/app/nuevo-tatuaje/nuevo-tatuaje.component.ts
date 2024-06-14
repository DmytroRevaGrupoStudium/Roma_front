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

  imagenes: string[] = [];

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

  guardarTatuaje() {
    if (this.formularioTatuaje.invalid) {
        // Si el formulario no es válido, muestra un mensaje de error o resalta los campos incorrectos
        return;
    }

    // Obtener los datos del formulario
    const tatuajeDatos = this.formularioTatuaje.value;
    tatuajeDatos.imagenes = this.imagenes;

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

todasLasImagenesPredeterminadas(): boolean {
  return this.imagenes.every((image: string) => image === 'addImage.png');
}
}