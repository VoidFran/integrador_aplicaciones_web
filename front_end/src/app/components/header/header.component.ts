import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service'; 



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  logout() {
    this.authService.logout()
  }
  
  constructor(private authService: AuthService ){
  
  }
  
  
  }



