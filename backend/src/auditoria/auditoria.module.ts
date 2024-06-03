import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuditoriaController } from "./controllers/auditoria.controller"
import { AuditoriaService } from "./services/auditoria.service"
import { UsuarioEntity } from "src/usuario/entities/usuario.entity"
import { AutenticacionModule } from "src/autenticacion/autenticacion.module"
import { AuditoriaEntity } from "./entities/auditoria.entity"

// Incluye el controlador de auditoria, usuario y servicios usuario
@Module({
    imports: [AutenticacionModule, TypeOrmModule.forFeature([AuditoriaEntity,UsuarioEntity])],
    controllers: [AuditoriaController],
    providers: [AuditoriaService],
})

export class AuditoriaModule { }