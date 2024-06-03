import { Component } from '@angular/core';
import { UsuarioEstadoEnum } from '../../enums/usuario_estado.enum';
import { RolesEnum } from '../../enums/roles.enum';
import { BaseComponent } from '../base/base.component';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GestionUsuariosComponent } from '../gestion-usuarios/gestion-usuarios.component';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-editar-agregar-usuarios',
  standalone: true,
  imports: [BaseComponent, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './editar-agregar-usuarios.component.html',
  styleUrls: ['./editar-agregar-usuarios.component.css']
})
export class EditarAgregarUsuariosComponent {
  estadoUsuario = UsuarioEstadoEnum;
  roles = RolesEnum;
  estados = Object.values(UsuarioEstadoEnum);
  rolesList = Object.values(RolesEnum);

  form: FormGroup;

  id: number;
  operacion: string = 'Registrar'

  constructor(private fb: FormBuilder, 
    private _usuarioService: 
    UsuariosService, 
    private router: Router, 
    private aRouter: ActivatedRoute
  
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      estado: ['', Validators.required],
      nombre_usuario: ['', [Validators.required, Validators.maxLength(7)]],
      rol: ['', Validators.required]
    });

    this.id = Number(aRouter.snapshot.paramMap.get('id'))
    
  }

    ngOnInit(): void{

      if(this.id !=0){
        this.operacion = "Editar"
      };


      this.getUnUsuario(this.id);
    }

    getUnUsuario(id:number){
      this._usuarioService.getUsuario(id).subscribe((data: UsuarioDto)=>{
        this.form.setValue({
          email: data.email,
          clave: data.clave,
          nombre: data.nombre,
          apellido: data.apellido,
          estado: data.estado,
          nombre_usuario: data.nombre_usuario,
          rol: data.rol
        })

      })
    }


  addUsuario() {
    if (this.form.valid) {
     
      
      const usuariosUsuarios: UsuarioDto ={
   
        id: this.form.value.id,
        email: this.form.value.email,
        clave: this.form.value.clave,
        nombre: this.form.value.nombre,
        apellido: this.form.value.apellido,
        estado: this.form.value.estado,
        nombre_usuario: this.form.value.nombre_usuario,
        rol: this.form.value.rol,
        fecha_registro: this.form.value.fecha_registro
      }

      if(this.id !== 0){
        usuariosUsuarios.id = this.id;
        this._usuarioService.editarUsuario(this.id, usuariosUsuarios).subscribe(() =>{
            this.router.navigate(['/GestionUsuarios']);
          })   

       

      }else{

        
        this._usuarioService.crearUsuario(usuariosUsuarios).subscribe(() =>{
        console.log("Usuario Creado")
        this.router.navigate(['/GestionUsuarios']);
      })
      
      }

    } else {
      console.log('El formulario no es válido');
      this.form.markAllAsTouched(); 
      this.logFormErrors();
    }
  }



  private logFormErrors() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control && control.errors) {  
        console.log(`Error en el control ${key}:`, control.errors);
      }
    });
  }






  
}