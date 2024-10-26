/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common"
import { AutenticacionGuard } from "src/autenticacion/guards/autenticacion.guard"
import { UsuarioService } from "../services/usuario.service"
import { UsuarioEntity } from "../entities/usuario.entity"
import { UsuarioDto } from "../dtos/usuario.dto"
import { Roles } from "src/autenticacion/decorators/roles.decorator"
import { UsuarioRolesEnum } from "../enums/usuario_roles.enum"
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger"

// El endpoint
@ApiTags('Usuarios')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    description : 'Unauthorized Bearer Auth'
})
@Controller("/usuarios")


// El controlador brinda los endpoints de los servicios
export class UsuarioController {
    // Accede a los metodos de servicio
    constructor(private usuarioService: UsuarioService) {}
    
    // Los decoradores
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    @Get()
    async buscarUsuarios(): Promise<UsuarioEntity[]> {
        return await this.usuarioService.buscarUsuarios()
    }

    @ApiParam({
        name: 'id'
    })
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    @Get(":id")
    async buscarUsuarioId(@Param() params): Promise<UsuarioEntity[]> {
        return await this.usuarioService.buscarUsuarioId(params.id)
    }
    
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    @ApiOperation({
        description: "Crea un usuario"
    })
    @ApiResponse({
        status: 201,
        description: 'Usuario creado correctamente'
    })
    @ApiResponse({
        status: 404,
        description: 'Ya existe el usuario con ese e-mail'
    })

    @Post()
    async agregarUsuario(@Body() usuario: UsuarioDto): Promise<UsuarioEntity> {
        return await this.usuarioService.agregarUsuario(usuario)
    }
    @ApiParam({
        name: 'id'
    })
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    @Put(":id")
    async editarUsuario(@Param() params, @Body() usuario: UsuarioDto) {
        return await this.usuarioService.editarUsuario(params.id, usuario)
    }

    @ApiParam({
        name: 'id'
    })
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    @Delete(":id")
    async borrarUsuario(@Param() params) {
        return await this.usuarioService.borrarUsuario(params.id)
    }
}
