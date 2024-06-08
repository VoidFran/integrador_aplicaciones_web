/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, NotFoundException } from "@nestjs/common";
import { AutenticacionGuard } from "src/autenticacion/guards/autenticacion.guard";
import { Roles } from "src/autenticacion/decorators/roles.decorator";
import { UsuarioRolesEnum } from "src/usuario/enums/usuario_roles.enum";
import { ActividadService } from "../services/actividad.service";
import { ActividadDto } from "../dtos/actividad.dto";
import { ActividadEstadoDto } from "../dtos/estado.dto";
import { ActividadEntity } from "../entities/actividad.entity";
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse, ApiParam, ApiOperation, ApiOkResponse } from "@nestjs/swagger";
import { ActividadEditarDto } from "../dtos/actividad_editar.dto"

@ApiTags('Actividades')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
})
@Controller("/actividades")
export class ActividadController {
    constructor(private actividadService: ActividadService) {}

    @ApiOperation({ summary: "Listar actividades según ROL" })
    @Roles([UsuarioRolesEnum.administrador, UsuarioRolesEnum.ejecutor])
    @UseGuards(AutenticacionGuard)
    @Get()
    async buscarActividades(@Req() request: Request) {
        return await this.actividadService.buscarActividades(request["usuario"]);
    }

    @Roles([UsuarioRolesEnum.ejecutor, UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    @Get("usuario/:idUsuario")
    async buscarActividadesPorIdUsuario(@Param('idUsuario') idUsuario: string): Promise<ActividadEntity[]> {
        const actividades = await this.actividadService.buscarActividadesPorIdUsuario(parseInt(idUsuario, 10));

        if (!actividades || actividades.length === 0) {
            throw new NotFoundException(`No se encontraron actividades para el usuario con ID ${idUsuario}`);
        }
        return actividades;
    }

    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async crearActividad(@Req() request: Request, @Body() ActividadDto: ActividadDto) {
        return await this.actividadService.crearActividad(ActividadDto, request["usuario"]);
    }

    @ApiParam({
        name: 'id'
    })
    @Roles([UsuarioRolesEnum.administrador, UsuarioRolesEnum.ejecutor])
    @UseGuards(AutenticacionGuard)
    @Put(":id")
    async editarActividad(@Req() request: Request, @Param() params, @Body() actividad: ActividadEditarDto) {
        return await this.actividadService.editarActividad(params.id, actividad, request["usuario"]);
    }

    @ApiParam({
        name: 'id'
    })
    @Roles([UsuarioRolesEnum.ejecutor])
    @UseGuards(AutenticacionGuard)
    @Delete(":id")
    async finalizarActividad(@Req() request: Request, @Param() params, @Body() estado: ActividadEstadoDto) {
        return await this.actividadService.finalizarActividad(params.id, estado, request["usuario"]);
    }

    @ApiOperation({ summary: "Buscar una actividad por su ID" })
    @Roles([UsuarioRolesEnum.ejecutor, UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    @Get(":id")
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID de la actividad a buscar'
    })
    @ApiOkResponse({ description: 'Actividad encontrada' })
    async buscarActividadPorId(@Param('id') id: string): Promise<ActividadEntity> {
        const actividad = await this.actividadService.buscarActividadPorId(parseInt(id, 10));

        if (!actividad) {
            throw new NotFoundException(`No se encontró la actividad con ID ${id}`);
        }
        return actividad;
    }
}
