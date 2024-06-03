/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, NotFoundException } from "@nestjs/common"
import { AutenticacionGuard } from "src/autenticacion/guards/autenticacion.guard"
import { Roles } from "src/autenticacion/decorators/roles.decorator"
import { UsuarioRolesEnum } from "src/usuario/enums/usuario_roles.enum"
import { AuditoriaService } from "../services/auditoria.service"

import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse, ApiParam, ApiOperation} from "@nestjs/swagger"

// El endpoint
@ApiTags('Auditoria')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    description : 'Unauthorized Bearer Auth'
})
@Controller("/auditoria")

// El controlador brinda los endpoints de los servicios
export class AuditoriaController {
    // Accede a los metodos de servicio
    constructor(private auditoriaService: AuditoriaService) {}

    // Los decoradores
    @ApiOperation ({ summary: "Listar auditoria según ROL"})
    @Roles([UsuarioRolesEnum.administrador, UsuarioRolesEnum.ejecutor])
    @UseGuards(AutenticacionGuard)
    @Get()
    async buscarAuditoriaes(@Req() request: Request) {
        return await this.auditoriaService.buscarAuditoriaes(request["usuario"])
    }
}
