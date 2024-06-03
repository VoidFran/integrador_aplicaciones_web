import { IsNotEmpty, IsString, IsEnum } from "class-validator"
import { AuditoriaEstadoEnum } from "../enums/auditoria_estado.enum"

// Los datos que le va pasar el front-end
export class AuditoriaEstadoDto {
    @IsNotEmpty()
    @IsString()
    @IsEnum(AuditoriaEstadoEnum)
    estado: AuditoriaEstadoEnum
}
