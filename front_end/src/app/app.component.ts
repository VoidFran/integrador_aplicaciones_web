import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdministradorComponent } from './components/administrador/administrador.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, AdministradorComponent],
  template: `<section> <router-outlet></router-outlet> </section>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'probando_angular';
}
