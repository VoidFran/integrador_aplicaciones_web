import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { TablaBaseComponent } from '../tabla-base/tabla-base.component';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { UsuarioEstadoEnum } from '../../enums/usuario_estado.enum';
import { RolesEnum } from '../../enums/roles.enum';
import { CommonModule } from '@angular/common'
import { Router, RouterModule } from '@angular/router';
import { EditarAgregarUsuariosComponent } from '../editar-agregar-usuarios/editar-agregar-usuarios.component';
 // Importar MatDialog y MatDialogModule
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [BaseComponent, TablaBaseComponent, CommonModule, RouterModule, ], // Añadir MatDialogModule
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent {
  listaUsuarios: UsuarioDto[] = [];



  constructor (private _usuarioService: UsuariosService){}


  ngOnInit(): void {
    this.getUsuarios()
  }



 getUsuarios(){
 
  this._usuarioService.getUsuarios().subscribe((data: UsuarioDto[]) => {
    this.listaUsuarios = data;
  })
 }

 eliminarUsuario(id: number){
  this._usuarioService.eliminarUsuario(id).subscribe(() => {
    this.getUsuarios();
  })
 }

 crearUsuario(){

 }

  
}
