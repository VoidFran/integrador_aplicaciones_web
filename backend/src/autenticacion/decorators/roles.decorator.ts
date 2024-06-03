import { UsuarioRolesEnum } from "../../usuario/enums/usuario_roles.enum"
import { Reflector } from "@nestjs/core"

// Devuelve el rol del usuario logeado
export const Roles = Reflector.createDecorator<UsuarioRolesEnum[]>()
