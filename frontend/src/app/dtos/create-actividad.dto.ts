import { PrioridadesEnum } from '../enums/prioridades.enum';
import { UsuarioDto } from './usuario.dto';
import { EstadosActividadEnum } from '../enums/estados-actividad.enum';

export interface CreateActividadDto {
  descripcion: string;

  id_usuario_actual: number;

  prioridad: PrioridadesEnum;
}
