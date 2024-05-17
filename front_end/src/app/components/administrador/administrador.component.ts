import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {
  integrantes = [
  {
    id: 1,
    nombre: "fran",
  },
  {
    id: 2,
    nombre: "gonza",
  },
  {
    id: 3,
    nombre: "brian",
  },
  ]

logout() {
  this.authService.logout()
}

constructor(private authService: AuthService ){

}
}