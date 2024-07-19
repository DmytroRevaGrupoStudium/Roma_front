import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { VistaProductoComponent } from './vista-producto/vista-producto.component';
import { MenuRopaComponent } from './menu-ropa/menu-ropa.component';
import { ContactoComponent } from './contacto/contacto.component';
import { TatuajesComponent } from './tatuajes/tatuajes.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { NuevoTatuajeComponent } from './nuevo-tatuaje/nuevo-tatuaje.component';
import { NuevoTipoProductoComponent } from './nuevo-tipo-producto/nuevo-tipo-producto.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/role.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    component: MainLayoutComponent, // Utilizar MainLayoutComponent como contenedor principal
    children: [
      { path: '', redirectTo: '/menu_principal', pathMatch: 'full' },
      { path: 'menu_principal', component: MenuPrincipalComponent },
      { path: 'vista_producto/:id', component: VistaProductoComponent },
      { path: 'menu_ropa', component: MenuRopaComponent },
      { path: 'menu_ropa/:tipoProducto', component: MenuRopaComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'tatuajes', component: TatuajesComponent },
      { path: 'nuevo_producto', component: NuevoProductoComponent, canActivate: [AuthGuard] },
      { path: 'nuevo_tatuaje', component: NuevoTatuajeComponent, canActivate: [AuthGuard] },
      { path: 'nuevo_tipo_producto', component: NuevoTipoProductoComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
