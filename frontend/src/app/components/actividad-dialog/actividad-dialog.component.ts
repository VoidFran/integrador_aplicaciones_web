import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { PrioridadesEnum } from '../enums/prioridades.enum';
import { EstadosActividadEnum } from '../enums/estados-actividad.enum';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ActividadesService } from '../../services/actividades.service';
import { ActividadDto } from '../../dtos/actividad.dto';
import { DropdownModule } from 'primeng/dropdown';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-actividad-dialog',
  standalone: true,
  imports: [
    DialogModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
    NgIf,
  ],
  templateUrl: './actividad-dialog.component.html',
  styleUrl: './actividad-dialog.component.scss',
})
export class ActividadDialogComponent {
  @Input({ required: true }) visible!: boolean;

  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() refrescar = new EventEmitter<boolean>();

  @Input({ required: true }) accion!: string;

  @Input({ required: false }) actividad!: ActividadDto | null;

  id_usuario_actual!: ActividadDto[];

  usuarios!: UsuarioDto[];

  prioridades = Object.values(PrioridadesEnum);

  estados = Object.values(EstadosActividadEnum);

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    descripcion: new FormControl<string | null>(null, [Validators.required]),
    id_usuario_actual: new FormControl<UsuarioDto | null>(null, [
      Validators.required,
    ]),
    prioridad: new FormControl<PrioridadesEnum | null>(null, [
      Validators.required,
    ]),
    estado: new FormControl<EstadosActividadEnum | null>(null),
  });
  
  constructor(
    private actividadesService: ActividadesService,
    private usuariosService: UsuariosService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.usuariosService.getUsuarios().subscribe({
    next: (res) => {
      this.usuarios = res;
      console.log("z", this.usuarios)
    },
    error: (err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Hubo un error al recuperar las opciones de usuario',
      });
    },
  });
    this.actividadesService.getActividades().subscribe({
      next: (res) => {
        this.id_usuario_actual = res;
              console.log(this.id_usuario_actual); // Verifica que los datos se están cargando

      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hubo un error al recuperar las opciones de usuario',
        });
      },
    });
  }

  llenarForm() {
    this.form.patchValue({
      id: this.actividad!.id as number,
      descripcion: this.actividad!.descripcion,
      prioridad: this.actividad!.prioridad,
      id_usuario_actual: this.actividad!.id_usuario_actual,
    });
  }

  ngOnChanges() {
    if (this.actividad) {
      this.llenarForm();
    } else {
      this.form.reset();
    }
  }

  cerrar() {
    this.visibleChange.emit(false);
  }

  enviar() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Debe ingresar todos los campos',
      });
      return;
    }

    const actividadDto = this.form.getRawValue();

    if (this.actividad) {
      this.actividadesService
        .editar({
          id: actividadDto.id!,
          descripcion: actividadDto.descripcion!,
          prioridad: actividadDto.prioridad!,
          id_usuario_actual: actividadDto.id_usuario_actual?.id!,
          estado: actividadDto.estado!,
        })
        .subscribe({
          next: (res) => {console.log("res",res)
            this.cerrar();
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
    } else {
      this.actividadesService
        .crear({
          descripcion: actividadDto.descripcion!,
          prioridad: actividadDto.prioridad!,
          id_usuario_actual: actividadDto.id_usuario_actual?.id!
        })
        .subscribe({
          next: (res) => {
            this.cerrar();
            this.refrescar.emit();
            this.messageService.add({
              severity: 'success',
              summary: 'Actividad creada con éxito!',
            });
          },
          error: (err) => {console.log(err)
            this.messageService.add({
              severity: 'error',
              summary: 'Ocurrió un error al crear la actividad',
            });
          },
        });
    }
  }
}