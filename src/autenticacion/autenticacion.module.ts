
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AutenticacionService } from "./autenticacion.service"
import { AutenticacionController } from "./autenticacion.controller"
import { UsuarioEntity } from "../usuario/usuario.entity"
import { APP_INTERCEPTOR } from '@nestjs/core';
import { InterceptorInterceptor } from './interceptor.interceptor';

// Incluye el controlador de usuario y servicios usuarios
@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [AutenticacionController],
    providers: [AutenticacionService, 
        {
            provide: APP_INTERCEPTOR,
            useClass: InterceptorInterceptor
        }]
})

export class AutenticacionModule { }
