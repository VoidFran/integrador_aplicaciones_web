import { IsNotEmpty, IsString, IsEnum } from "class-validator"
import { ActividadPrioridadEnum } from "../enums/actividad_prioridad.enum"
import { ActividadEstadoEnum } from "../enums/actividad_estado.enum"

// Los datos que le va pasar el front-end
export class ActividadDto {
    @IsString()
    descripcion: string

    @IsNotEmpty()
    id_usuario_actual: number

    @IsNotEmpty()
    @IsString()
    @IsEnum(ActividadPrioridadEnum)
    prioridad: ActividadPrioridadEnum
}
