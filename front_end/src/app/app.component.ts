import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { IntegrantesComponent } from './integrantes/integrantes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsuarioComponent, IntegrantesComponent],
  template: `<section> <app-usuario></app-usuario> <app-integrantes></app-integrantes> </section>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'probando_angular';
}
