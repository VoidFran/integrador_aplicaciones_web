import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActividadDto } from '../dtos/actividad.dto'
import { CreateActividadDto } from '../dtos/create-actividad.dto';
import { EditActividadDto } from '../dtos/edit-actividad.dto';
import { environment } from '../../enviroments/enviroments';
import { ActualizarEstadoActividadDto } from '../dtos/actualizar-estado-actividad.dto';

@Injectable({
  providedIn: 'root',
})
export class ActividadesService {
  constructor(private client: HttpClient) {}

  getActividad(id: number): Observable<ActividadDto> {
    return this.client.get<ActividadDto>(
      `${environment.apiUrl}/actividades/${id}`
    );
  }

  getActividades(): Observable<ActividadDto[]> {
    return this.client.get<ActividadDto[]>(
      `${environment.apiUrl}/actividades`
    );
  }

  crear(actividadDto: CreateActividadDto): Observable<ActividadDto> {
    return this.client.post<ActividadDto>(
      `${environment.apiUrl}/actividades`,
      actividadDto
    );
  }

  editar(actividadDto: EditActividadDto) {
    console.log(actividadDto)
    return this.client.put(
      `${environment.apiUrl}/actividades/${actividadDto.id}`,
      actividadDto
    );
  }

  actualizarEstado(estadoDto: ActualizarEstadoActividadDto) {
    console.log("asd",estadoDto)
    return this.client.patch(
      `${environment.apiUrl}/actividades/${estadoDto.id}/estado`,
      { estado: estadoDto.estado }
    );
  }
}