import { Component, ViewChild, OnInit  } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Table, TableModule } from 'primeng/table';
import { ActividadDto } from '../../dtos/actividad.dto';
import { ActividadesService } from '../../services/actividades.service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ActividadDialogComponent } from '../actividad-dialog/actividad-dialog.component';
import { NgFor, NgIf } from '@angular/common';
import { MessageService, SelectItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router, RouterModule } from '@angular/router';
import { TablaBaseComponent } from '../tabla-base/tabla-base.component';
import { BaseComponent } from '../base/base.component';
import { DropdownModule } from 'primeng/dropdown';

/**
 * Pantalla para los usuarios con el rol de ADMINISTRADOR
 */
@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [
    ActividadDialogComponent,
    ButtonModule,
    TooltipModule,
    ToastModule,
    NgIf,
    NgFor,
    RouterModule,
    TablaBaseComponent,
    TableModule,
    BaseComponent
  ],
  templateUrl: './actividades-admin.component.html',
  styleUrl: './actividades-admin.component.scss',
})
export class ActividadesAdminComponent implements OnInit {
  actividades: ActividadDto[] = [];
  dialogVisible: boolean = false;
  accion!: string;
  actividadSeleccionada!: ActividadDto | null;
  columnas: { field: string; header: string; filter?: boolean }[] = [];
  opcionesDeFiltro: { value: string; label: string }[] = [];

  constructor(
    private actividadesService: ActividadesService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.columnas = [
      { field: 'id', header: 'Id' },
      { field: 'descripcion', header: 'Descripción', filter: true },
      { field: 'prioridad', header: 'Prioridad' },
      { field: 'id_usuario_actual', header: 'ID Responsable' },
      { field: 'estado', header: 'Estado' },
    ];

    this.opcionesDeFiltro = [
      { value: 'startsWith', label: 'Empieza con' },
      { value: 'contains', label: 'Contiene' },
    ];
    this.llenarTabla();
  }

  llenarTabla(): void {
    this.actividadesService.getActividades().subscribe({
      next: (res) => {
        this.actividades = res;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ocurrió un error al recuperar la lista de actividades',
        });
      },
    });
  }

  nuevo(): void {
    this.actividadSeleccionada = null;
    this.accion = 'Crear';
    this.dialogVisible = true;
  }

  editar(): void {
    this.accion = 'Editar';
    this.dialogVisible = true;
  }

  Gestionusuarios(): void{
    this.router.navigateByUrl('/GestionUsuarios');
  }

  auditoria(): void {
    this.router.navigateByUrl('/auditoria/' + this.actividadSeleccionada!.id);
  }
}


