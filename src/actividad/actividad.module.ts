import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ActividadController } from "./controllers/actividad.controller"
import { ActividadService } from "./services/actividad.service"
import { ActividadEntity } from "./entities/actividad.entity"
import { UsuarioEntity } from "src/usuario/entities/usuario.entity"
import { AutenticacionModule } from "src/autenticacion/autenticacion.module"

// Incluye el controlador de actividades, usuario y servicios usuario
@Module({
    imports: [AutenticacionModule, TypeOrmModule.forFeature([ActividadEntity, UsuarioEntity])],
    controllers: [ActividadController],
    providers: [ActividadService],
})

export class ActividadModule { }
