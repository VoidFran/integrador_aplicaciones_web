import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { UsuarioRolesEnum } from "../usuario/usuario_roles.enum"
import { Reflector } from "@nestjs/core"

export const Roles = Reflector.createDecorator<UsuarioRolesEnum[]>()
