import { EstadosActividadEnum } from "../enums/estados-actividad.enum";
export interface ActualizarEstadoActividadDto {
    id: number;
    estado: EstadosActividadEnum;
  }
  