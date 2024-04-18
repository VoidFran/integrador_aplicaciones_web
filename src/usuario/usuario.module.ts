import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsuarioController } from "./usuario.controller"
import { UsuarioService } from "./usuario.service"
import { UsuarioEntity } from "./usuario.entity"


// Incluye el controlador de usuario y servicios usuarios
@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioService],
})

export class UsuarioModule { }
