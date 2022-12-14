import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarMascotasComponent } from './componentes/editar-mascotas/editar-mascotas.component';
import { LoginComponent } from './componentes/login/login.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guardianes/auth.guard';
import { ConfiguracionGuard } from './guardianes/configuracion.guard';

const routes: Routes = [
  {
    path: '', component: TableroComponent,
    canActivate :[AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'registrarse',
    component: RegistroComponent,
    canActivate :[ConfiguracionGuard]
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent,
    canActivate :[AuthGuard]
  },
  {
    path: 'mascota/editar/:id',
    component: EditarMascotasComponent,
    canActivate :[AuthGuard]
  },
  { path: '**', component: NoEncontradoComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
