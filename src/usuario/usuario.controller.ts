import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from "@nestjs/common"
import { UsuarioService } from "./usuario.service"
import { UsuarioEntity } from "./usuario.entity"
import { UsuarioDto } from "./usuario.dto"
import { AutenticacionGuard } from "src/autenticacion/autenticacion.guard"
import { Roles } from "src/autenticacion/roles.decorator"
import { UsuarioRolesEnum } from "./usuario_roles.enum"

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
        console.log("usuarios encontrados")
        return await this.usuariosService.getAllUsuarios()
    }

    @Get(":id")
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async getUsuario(@Param() params): Promise<UsuarioEntity[]> {
        console.log("usuario encontrado")
        return await this.usuariosService.getUsuarioById(params.id)
    }

    @Post()
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async addUsuario(@Body() usuario: UsuarioDto): Promise<UsuarioEntity> {
        console.log("usuario agregado")
        return await this.usuariosService.addUsuario(usuario)
    }

    //@Put(":id")
    //async editUsuario(@Param() params, @Body() usuario: UsuarioDto) {
    //    return await this.usuariosService.editUsuario(params.id, usuario)
    //}

    @Delete(":id")
    @Roles([UsuarioRolesEnum.administrador])
    @UseGuards(AutenticacionGuard)
    async deleteUsuario(@Param() params) {
        return await this.usuariosService.deleteUsuario(params.id)
    }
}
