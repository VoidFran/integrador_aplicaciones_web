
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AutenticacionService } from "./autenticacion.service"
import { AutenticacionController } from "./autenticacion.controller"
import { UsuarioEntity } from "../usuario/usuario.entity"

// Incluye el controlador de usuario y servicios usuarios
@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [AutenticacionController],
    providers: [AutenticacionService],
})

export class AutenticacionModule { }
