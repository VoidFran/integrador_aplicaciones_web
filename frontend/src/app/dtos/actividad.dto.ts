import { EstadosActividadEnum } from "../enums/estados-actividad.enum";
import { PrioridadesEnum } from "../enums/prioridades.enum";
import { UsuarioDto } from "./usuario.dto";

export interface ActividadDto{
    fecha_registro: string|number|Date;
    fecha_modificacion: string|number|Date;
    id_usuario_modificacion: number;
        
    id: number;

    descripcion: string|null;
  
    id_usuario_actual: UsuarioDto|null;
  
    prioridad: PrioridadesEnum|null;
  
    estado: EstadosActividadEnum|null;
  
}