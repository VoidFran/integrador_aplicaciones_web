import { UsuarioEstadoEnum } from "./usuario_estado.enum"
import { UsuarioRolesEnum } from ".//usuario_roles.enum"

export interface UsuarioDto {
    email: string
    clave: string
    nombre: string
    apellido: string
    estado: UsuarioEstadoEnum
    nombre_usuario: string
    rol: UsuarioRolesEnum
}
