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
import { ProductosAdminComponent } from './productos-admin/productos-admin.component';
import { ActivateComponent } from './activate/activate.component';
import { NuevaClaveComponent } from './nueva-clave/nueva-clave.component';
import { VistaTatuajeComponent } from './vista-tatuaje/vista-tatuaje.component';
import { GestionComponent } from './gestion/gestion.component';

const routes: Routes = [
  // Componentes sin header y footer
  { path: 'auth', component: AuthComponent },
  { path: 'activate', component: ActivateComponent },
  { path: 'nueva_clave', component: NuevaClaveComponent },
  {
    path: '',
    component: MainLayoutComponent, // Utilizar MainLayoutComponent como contenedor principal
    children: [
      // Componentes con header y footer
      { path: '', redirectTo: '/menu_principal', pathMatch: 'full' },
      { path: 'menu_principal', component: MenuPrincipalComponent },
      { path: 'vista_producto/:id', component: VistaProductoComponent },
      { path: 'vista_tatuaje/:id', component: VistaTatuajeComponent },
      { path: 'menu_ropa', component: MenuRopaComponent },
      { path: 'menu_ropa/:tipoProducto', component: MenuRopaComponent },
      { path: 'contacto', component: ContactoComponent },
      { path: 'tatuajes', component: TatuajesComponent },
      { path: 'nuevo_producto', component: NuevoProductoComponent, canActivate: [AuthGuard] },
      { path: 'nuevo_tatuaje', component: NuevoTatuajeComponent, canActivate: [AuthGuard] },
      { path: 'nuevo_tipo_producto', component: NuevoTipoProductoComponent, canActivate: [AuthGuard] },
      { path: 'productos_admin', component: ProductosAdminComponent, canActivate: [AuthGuard] },
      { path: 'gestion/:elemento', component: GestionComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
