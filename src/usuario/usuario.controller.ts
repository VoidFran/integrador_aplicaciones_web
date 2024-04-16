import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioDto } from './usuario.interfaz';

@Controller("usuarios")

// El controlador brinda los endpoints de los servicios
export class UsuarioController {
    // Accede a los metodos de servicio
    constructor(private readonly usuariosService: UsuarioService) {}

    // Los endpoints
    @Get()
    async getUsuarios(): Promise<UsuarioEntity[]> {
        return await this.usuariosService.getAllUsuarios();
    }

    @Post()
    async addUsuario(@Body() usuario: UsuarioDto): Promise<UsuarioEntity> {
            return await this.usuariosService.addUsuario(usuario);
    }

    //@Put(":id")
    //async editUsuario(@Param() params, @Body() usuario: UsuarioDto) {
    //    return await this.usuariosService.editUsuario(params.id, usuario);
    //}

    @Delete(":id")
    async deleteUsuario(@Param() params) {
        return await this.usuariosService.deleteUsuario(params.id);
    }
}
