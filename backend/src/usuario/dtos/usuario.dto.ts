/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEmail, IsEnum } from "class-validator"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsuarioEstadoEnum } from "../enums/usuario_estado.enum"
import { UsuarioRolesEnum } from "../enums/usuario_roles.enum"
import { ApiProperty } from "@nestjs/swagger"
// Los datos que le va pasar el front-end
export class UsuarioDto {
    @ApiProperty()
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

    @IsNotEmpty()
    @IsString()
    nombre_usuario: string

    @IsEnum(UsuarioRolesEnum)
    rol: UsuarioRolesEnum
}
