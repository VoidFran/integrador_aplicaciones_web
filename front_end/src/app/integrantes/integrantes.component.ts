import { Component } from '@angular/core';

@Component({
  selector: 'app-integrantes',
  standalone: true,
  imports: [],
  templateUrl: './integrantes.component.html',
  styleUrl: './integrantes.component.css'
})
export class IntegrantesComponent {
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
}
