import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActividadDto } from '../../dtos/actividad.dto';
import { ActividadesService } from '../../services/actividades.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-actividades-ejecutor',
  standalone: true,
  imports: [BaseComponent, CommonModule,  RouterLink],
  templateUrl: './actividades-ejecutor.component.html',
  styleUrl: './actividades-ejecutor.component.css'
})
export class ActividadesEjecutorComponent {

  listaActividades: ActividadDto[] =[]


  

  constructor (private _actividadService: ActividadesService){}


  ngOnInit(): void {
    this.getActividadesLista()
  }



 getActividadesLista(){
 
  this._actividadService.getActividades().subscribe((data: ActividadDto[]) => {
    this.listaActividades = data;
  })
 }
 



  
}







