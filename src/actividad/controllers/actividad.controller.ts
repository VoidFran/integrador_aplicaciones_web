import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common"
import { AutenticacionGuard } from "src/autenticacion/guards/autenticacion.guard"
import { Roles } from "src/autenticacion/decorators/roles.decorator"
import { UsuarioRolesEnum } from "src/usuario/enums/usuario_roles.enum"
import { ActividadEntity } from "../entities/actividad.entity"
import { ActividadService } from "../services/actividad.service"
import { ActividadDto } from "../dtos/actividad.dto"

// El endpoint
@Controller("/actividades")

// El controlador brinda los endpoints de los servicios
export class ActividadController {
    // Accede a los metodos de servicio
    constructor(private readonly actividadService: ActividadService) {}

    // Los decoradores
    @Get()
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async buscarUsuarios(): Promise<ActividadEntity[]> {
        return await this.actividadService.buscarActividades()
    }

    @Post()
    async crearActividad(@Body() request: Request, ActividadDto: ActividadDto) {
        //return await this.usuariosService.login(loginDto)
        console.log(request)
        return await this.actividadService.crearActividad(ActividadDto, request["usuario"])
        //return await this.usuariosService.agregarUsuario(usuario)
    }
}
