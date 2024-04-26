
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AutenticacionService } from "./services/autenticacion.service"
import { AutenticacionController } from "./controllers/autenticacion.controller"
import { UsuarioEntity } from "../usuario/entities/usuario.entity"
import { UsuarioService } from "src/usuario/services/usuario.service"
import { UsuarioController } from "src/usuario/controllers/usuario.controller"

// Incluye el controlador de usuario y servicios usuarios
@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [AutenticacionController, UsuarioController],
    providers: [AutenticacionService, UsuarioService],
    exports: [UsuarioService] // Si otro modulo exporta este, deja disponible UsuarioService
})

export class AutenticacionModule { }
