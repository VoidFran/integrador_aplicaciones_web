import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { EjecutorComponent } from './components/ejecutor/ejecutor.component';
import { AuthGuard } from './guards/auth.guard';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { EditarAgregarUsuariosComponent } from './components/editar-agregar-usuarios/editar-agregar-usuarios.component';
import { EditarEstadoActividadComponent } from './components/editar-estado-actividad/editar-estado-actividad.component';
// import { NotFoundComponent } from './components/not-found/not-found.component';



export const routes: Routes = [
    {path: 'login', component: LoginComponent},    
    {path: 'administrador', component: AdministradorComponent, canActivate: [AuthGuard], data: {
        expectedRole: 'administrador'
    }},
    {path: 'ejecutor', component: EjecutorComponent, canActivate: [AuthGuard], data: {
        expectedRole: 'ejecutor'
    }},
    { path: 'GestionUsuarios', component: GestionUsuariosComponent, canActivate: [AuthGuard], data: {
        expectedRole: 'administrador'
    } },
    { path: 'addusuarios', component: EditarAgregarUsuariosComponent, canActivate: [AuthGuard], data: {
        expectedRole: 'administrador'
    } },
    { path: 'edit/:id', component: EditarAgregarUsuariosComponent, canActivate: [AuthGuard], data: {
        expectedRole: 'administrador'
    } },
    
    { path: 'editarEstado/:id', component: EditarEstadoActividadComponent, canActivate: [AuthGuard], data: {
        expectedRole: 'ejecutor'}},

    {path : '**', redirectTo: 'login'},
    // {path : '**', component: NotFoundComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }