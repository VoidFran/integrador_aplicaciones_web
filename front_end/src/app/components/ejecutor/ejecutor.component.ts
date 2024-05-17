import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ejecutor',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './ejecutor.component.html',
  styleUrl: './ejecutor.component.css'
})
export class EjecutorComponent {
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