import { Module } from "@nestjs/common"
import { AutenticacionController } from "./autenticacion.controller"

// Incluye el controlador de usuario y servicios usuarios
@Module({
    imports: [],
    controllers: [AutenticacionController],
    providers: [],
})

export class AutenticacionModule { }