// editar-estado-actividad.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActividadesService } from '../../services/actividades.service';
import { EstadosActividadEnum } from '../../enums/estados-actividad.enum';
import { ActividadDto } from '../../dtos/actividad.dto';
import { BaseComponent } from '../base/base.component';
import { EditActividadDto } from '../../dtos/edit-actividad.dto';
import { ActualizarEstadoActividadDto } from '../../dtos/actualizar-estado-actividad.dto';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';



@Component({
  selector: 'app-editar-estado-actividad',
  standalone: true,
  imports: [BaseComponent, CommonModule, RouterModule, ReactiveFormsModule, ButtonModule, DropdownModule],
  templateUrl: './editar-estado-actividad.component.html',
  styleUrls: ['./editar-estado-actividad.component.css']
})
export class EditarEstadoActividadComponent implements OnInit {
  EstadoActividad = Object.values(EstadosActividadEnum);
  formActividad: FormGroup;
  id: number = 0;

  @Output() refrescar = new EventEmitter<boolean>();
  @Input({ required: false }) actividad!: ActividadDto | null;

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    estado: new FormControl<EstadosActividadEnum | null>(null),
  });

  estados = Object.values(EstadosActividadEnum);

  constructor(
    private fb: FormBuilder,
    private _actividadService: ActividadesService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formActividad = this.fb.group({
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this._actividadService.getActividad(this.id).subscribe(data => {
      this.formActividad.patchValue({ estado: data.estado });
    });
  }

  
  enviar() {
    const actividadDto = this.form.getRawValue();
    console.log("aaa", this.id!,actividadDto.estado!)
      this._actividadService
      .actualizarEstado({
        id: this.id!,
        estado: actividadDto.estado!,
        })
        .subscribe({
          next: (res) => {console.log("res",res)
            this.refrescar.emit();
            this.messageService.add({
              severity: 'success',
              summary: 'Actividad editada con éxito!',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ocurrió un error al editar la actividad',
            });
          },
        });
}
}