import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsuarioController } from "./controllers/usuario.controller"
import { UsuarioService } from "./services/usuario.service"
import { UsuarioEntity } from "./entities/usuario.entity"

// Incluye el controlador de usuario y servicios usuario
@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [UsuarioController],
    providers: [UsuarioService],
})

export class UsuarioModule { }
