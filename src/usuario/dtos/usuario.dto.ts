import { IsNotEmpty, IsString, IsEmail, IsEnum } from "class-validator"
import { UsuarioEstadoEnum } from "../enums/usuario_estado.enum"
import { UsuarioRolesEnum } from "../enums/usuario_roles.enum"

export class UsuarioDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    clave: string

    @IsNotEmpty()
    @IsString()
    nombre: string

    @IsNotEmpty()
    @IsString()
    apellido: string

    estado: UsuarioEstadoEnum

    @IsNotEmpty()
    @IsString()
    nombre_usuario: string

    @IsEnum(UsuarioRolesEnum)
    rol: UsuarioRolesEnum
}