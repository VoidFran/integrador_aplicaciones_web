import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common"
import { AutenticacionGuard } from "src/autenticacion/guards/autenticacion.guard"
import { UsuarioService } from "../services/usuario.service"
import { UsuarioEntity } from "../entities/usuario.entity"
import { UsuarioDto } from "../dtos/usuario.dto"
import { Roles } from "src/autenticacion/decorators/roles.decorator"
import { UsuarioRolesEnum } from "../enums/usuario_roles.enum"

// El endpoint
@Controller("/usuarios")

// El controlador brinda los endpoints de los servicios
export class UsuarioController {
    // Accede a los metodos de servicio
    constructor(private readonly usuarioService: UsuarioService) {}

    // Los decoradores
    @Get()
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async buscarUsuarios(): Promise<UsuarioEntity[]> {
        return await this.usuarioService.buscarUsuarios()
    }

    @Get(":id")
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async buscarUsuarioId(@Param() params): Promise<UsuarioEntity[]> {
        return await this.usuarioService.buscarUsuarioId(params.id)
    }

    @Post()
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async agregarUsuario(@Body() usuario: UsuarioDto): Promise<UsuarioEntity> {
        return await this.usuarioService.agregarUsuario(usuario)
    }

    @Put(":id")
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async editarUsuario(@Param() params, @Body() usuario: UsuarioDto) {
        return await this.usuarioService.editarUsuario(params.id, usuario)
    }

    @Delete(":id")
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async borrarUsuario(@Param() params) {
        return await this.usuarioService.borrarUsuario(params.id)
    }
}
