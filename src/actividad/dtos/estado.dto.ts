import { IsNotEmpty, IsString, IsEnum } from "class-validator"
import { ActividadEstadoEnum } from "../enums/actividad_estado.enum"

// Los datos que le va pasar el front-end
export class ActividadEstadoDto {
    @IsNotEmpty()
    @IsString()
    @IsEnum(ActividadEstadoEnum)
    estado: ActividadEstadoEnum

    @IsNotEmpty()
    id_usuario_actual: number
}
