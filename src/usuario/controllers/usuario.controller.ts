import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, NotFoundException } from "@nestjs/common"
import { UsuarioService } from "../services/usuario.service"
import { UsuarioEntity } from "../entities/usuario.entity"
import { UsuarioDto } from "../dtos/usuario.dto"
import { AutenticacionGuard } from "src/autenticacion/guards/autenticacion.guard"
import { Roles } from "src/autenticacion/decorators/roles.decorator"
import { UsuarioRolesEnum } from "../enums/usuario_roles.enum"

// El endpoint
@Controller("/usuarios")

// El controlador brinda los endpoints de los servicios
export class UsuarioController {
    // Accede a los metodos de servicio
    constructor(private readonly usuariosService: UsuarioService) {}

    // Los decoradores
    @Get()
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async getUsuarios(): Promise<UsuarioEntity[]> {
        return await this.usuariosService.getAllUsuarios()
    }

    @Get(":id")
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async getUsuario(@Param() params): Promise<UsuarioEntity[]> {
        return await this.usuariosService.getUsuarioById(params.id)
    }

    @Post()
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async addUsuario(@Body() usuario: UsuarioDto): Promise<UsuarioEntity> {
        return await this.usuariosService.addUsuario(usuario)
    }

    @Put(":id")
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async editUsuario(@Param() params, @Body() usuario: UsuarioDto) {
        return await this.usuariosService.editUsuario(params.id, usuario)
    }

    @Delete(":id")
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async deleteUsuario(@Param() params) {
        return await this.usuariosService.deleteUsuario(params.id)
    }
}
