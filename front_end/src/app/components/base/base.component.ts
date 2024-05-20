import { Component, importProvidersFrom } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { AdministradorComponent } from '../administrador/administrador.component';
import { EjecutorComponent } from '../ejecutor/ejecutor.component';
@Component({
  selector: 'app-base',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ToastModule],
  templateUrl: './base.component.html',
  styleUrl: '../../app.component.css'
})
export class BaseComponent {

}
