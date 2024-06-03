import { Component } from '@angular/core';
import { FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

//Angular Material
import{ MatSliderModule } from '@angular/material/slider';
//prime 
import { InputTextModule } from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password'
import {ButtonModule} from 'primeng/button'
import {ToastModule} from 'primeng/toast'
import { MessageService } from 'primeng/api';
import {CardModule } from 'primeng/card';


//Componentes

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, ToastModule , CardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = new FormGroup({

    nombre_usuario: new FormControl('', [Validators.required]),
    clave: new FormControl('',[Validators.required]),

  });


 constructor(private messageService: MessageService, private router:Router, private authService: AuthService ){

 }

 ngOnInit(){

 }


 login() {
  console.log
  if (!this.form.valid) {
    this.form.markAllAsTouched();
    this.messageService.add({
      severity: 'error',
      summary: 'Debe ingresar todos los campos',
    });
    return;
  }
  const formValue = this.form.getRawValue();
  this.authService
    .login(formValue.nombre_usuario!, formValue.clave!)
    .subscribe({
      next: (res) => {
        this.authService.setSession(res.token);

        if (this.authService.hasRole() === "administrador") {
          this.router.navigateByUrl('administrador');
        } else {
          this.router.navigateByUrl('ejecutor');
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error de autenticación, verifique los campos',
        });
      },
    });

}
}
