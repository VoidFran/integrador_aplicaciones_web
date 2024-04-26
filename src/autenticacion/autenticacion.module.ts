
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AutenticacionService } from "./services/autenticacion.service"
import { AutenticacionController } from "./controllers/autenticacion.controller"
import { UsuarioEntity } from "../usuario/entities/usuario.entity"
import { APP_INTERCEPTOR } from '@nestjs/core'

// Incluye el controlador de usuario y servicios usuarios
@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [AutenticacionController],
    providers: [AutenticacionService]
})

export class AutenticacionModule { }
