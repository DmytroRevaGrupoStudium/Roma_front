import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoProductoService } from '../services/tipo-producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-tipo-producto',
  templateUrl: './nuevo-tipo-producto.component.html',
  styleUrl: './nuevo-tipo-producto.component.css'
})
export class NuevoTipoProductoComponent {
  formularioTipoProducto!: FormGroup; // Definir el FormGroup

  constructor(
    private fb: FormBuilder, // Inyectar FormBuilder
    private tipoProductoService: TipoProductoService
  ) {
    this.formularioTipoProducto = this.fb.group({
      tipoProducto: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  // Método para guardar el tipo de producto
  guardarTipoProducto() {
    if (this.formularioTipoProducto.invalid) {
        // Si el formulario no es válido, muestra un mensaje de error o resalta los campos incorrectos
        return;
    }

    // Obtener los datos del formulario
    const tipoProductoDatos = this.formularioTipoProducto.value;

    // Animación de cargando para que user no se desespere
    Swal.fire({
      title: "Cargando...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      timerProgressBar: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Llama al servicio para guardar el Tatuaje
    this.tipoProductoService.guardarTipoProducto(tipoProductoDatos).subscribe({
        next: response => {
            Swal.close();

            Swal.fire({
              title: "¡Éxito!",
              text: "Categoría "+tipoProductoDatos.tipoProducto+", se ha cerado correctamente.",
              icon: "success"
            });

            this.formularioTipoProducto.reset();
        },
        error: error => {
            Swal.close();

            Swal.fire({
              icon: "error",
              title: "Se ha producido un error",
              text: error.message,
            });

            this.formularioTipoProducto.reset();
        }
    });
}
}