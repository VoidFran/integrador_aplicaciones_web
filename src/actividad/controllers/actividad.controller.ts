import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from "@nestjs/common"
import { AutenticacionGuard } from "src/autenticacion/guards/autenticacion.guard"
import { Roles } from "src/autenticacion/decorators/roles.decorator"
import { UsuarioRolesEnum } from "src/usuario/enums/usuario_roles.enum"
import { ActividadService } from "../services/actividad.service"
import { ActividadDto } from "../dtos/actividad.dto"
import { ActividadEstadoDto } from "../dtos/estado.dto"

// El endpoint
@Controller("/actividades")

// El controlador brinda los endpoints de los servicios
export class ActividadController {
    // Accede a los metodos de servicio
    constructor(private actividadService: ActividadService) {}

    // Los decoradores
    @Roles([UsuarioRolesEnum.administrador, UsuarioRolesEnum.ejecutor])
    @UseGuards(AutenticacionGuard)
    @Get()
    async buscarUsuarios(@Req() request: Request) {
        return await this.actividadService.buscarActividades(request["usuario"])
    }

    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    @Post()
    async crearActividad(@Req() request: Request, @Body() ActividadDto: ActividadDto) {
        return await this.actividadService.crearActividad(ActividadDto, request["usuario"])
    }

    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    @Put(":id")
    async editarActividad(@Param() params, @Body() actividad: ActividadDto) {
        return await this.actividadService.editarActividad(params.id, actividad)
    }

    @Roles([UsuarioRolesEnum.ejecutor])
    @UseGuards(AutenticacionGuard)
    @Delete(":id")
    async finalizarActividad(@Req() request: Request, @Param() params, @Body() estado: ActividadEstadoDto) {
        return await this.actividadService.finalizarActividad(params.id, estado, request["usuario"])
    }
}
