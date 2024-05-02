import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductosComponent} from "./productos/productos.component";
import {AddEditProductosComponent} from "./productos/add-edit-productos/add-edit-productos.component";


const routes: Routes = [
  {path: 'productos', component:ProductosComponent},
  { path: 'editar-producto/:id', component: AddEditProductosComponent },
  {path: 'agregar-producto', component:AddEditProductosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
