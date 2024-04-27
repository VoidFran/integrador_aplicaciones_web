import { IsNotEmpty, IsString, IsNumber } from "class-validator"
import { ActividadPrioridadEnum } from "../enums/actividad_prioridad.enum"

// Los datos que le va pasar el front-end
export class ActividadDto {
    @IsString()
    descripcion: string

    @IsNotEmpty()
    id_usuario_actual: number

    @IsNotEmpty()
    @IsString()
    prioridad: ActividadPrioridadEnum
}
