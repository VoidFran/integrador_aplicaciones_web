import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CsvController } from "./controllers/scv.controller"
import { CsvService } from "./services/csv.service"
import { AutenticacionModule } from "src/autenticacion/autenticacion.module"
import { ActividadService } from "src/actividad/services/actividad.service"
import { ActividadEntity } from "src/actividad/entities/actividad.entity"

// Incluye el controlador de usuario y servicios usuarios
@Module({
    imports: [AutenticacionModule, TypeOrmModule.forFeature([ActividadEntity])],
    controllers: [CsvController],
    providers: [CsvService, ActividadService],
})

export class CsvModule { }
