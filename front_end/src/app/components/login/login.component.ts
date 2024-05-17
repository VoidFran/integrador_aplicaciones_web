import { Component } from '@angular/core';
import { FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password'
import {ButtonModule} from 'primeng/button'
import {ToastModule} from 'primeng/toast'
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, ToastModule],
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
          summary: 'Error de autenticacion, verifique los campos',
        });
      },
    });
}
}
