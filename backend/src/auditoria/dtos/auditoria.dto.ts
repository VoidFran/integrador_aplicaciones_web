import { IsNotEmpty, IsString, IsEnum } from "class-validator"
import { AuditoriaPrioridadEnum } from "../enums/auditoria_prioridad.enum"
import { AuditoriaEstadoEnum } from "../enums/auditoria_estado.enum"

// Los datos que le va pasar el front-end
export class AuditoriaDto {
    @IsString()
    descripcion: string

    @IsNotEmpty()
    id_usuario_actual: number

    @IsNotEmpty()
    @IsString()
    @IsEnum(AuditoriaPrioridadEnum)
    prioridad: AuditoriaPrioridadEnum

    @IsNotEmpty()
    @IsString()
    @IsEnum(AuditoriaEstadoEnum)
    estado: AuditoriaEstadoEnum
}
