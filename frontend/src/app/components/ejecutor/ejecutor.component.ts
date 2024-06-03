import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { BaseComponent} from '../base/base.component';
import { ActividadesEjecutorComponent } from '../actividades-ejecutor/actividades-ejecutor.component';

@Component({
  selector: 'app-ejecutor',
  standalone: true,
  imports: [ButtonModule , BaseComponent, ActividadesEjecutorComponent],
  templateUrl: './ejecutor.component.html',
  styleUrl: './ejecutor.component.css'
})
export class EjecutorComponent {
  
}