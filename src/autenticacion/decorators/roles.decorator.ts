import { UsuarioRolesEnum } from "../../usuario/enums/usuario_roles.enum"
import { Reflector } from "@nestjs/core"

export const Roles = Reflector.createDecorator<UsuarioRolesEnum[]>()
