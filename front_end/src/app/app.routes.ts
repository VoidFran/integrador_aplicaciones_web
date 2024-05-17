import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { EjecutorComponent } from './components/ejecutor/ejecutor.component';
import { AuthGuard } from './components/services/auth.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},    
    {path: 'administrador', component: AdministradorComponent, canActivate: [AuthGuard], data: {
        expectedRole: 'administrador'
    }},
    {path: 'ejecutor', component: EjecutorComponent, canActivate: [AuthGuard], data: {
        expectedRole: 'ejecutor'
    }},
    {path : '**', redirectTo: 'login'}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }