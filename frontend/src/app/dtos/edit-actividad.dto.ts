import { PrioridadesEnum } from '../enums/prioridades.enum';
import { EstadosActividadEnum } from '../enums/estados-actividad.enum';
import { UsuarioDto } from './usuario.dto';

export interface EditActividadDto {

  id: number;

  descripcion: string;

  id_usuario_actual: number;

  prioridad: PrioridadesEnum;

  estado: EstadosActividadEnum;
}
