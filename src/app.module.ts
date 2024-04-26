import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { join } from "path"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { JwtModule } from "@nestjs/jwt"
import { UsuarioModule } from "./usuario/usuario.module"
import { ActividadModule } from './actividad/actividad.module';
import { AutenticacionModule } from "./autenticacion/autenticacion.module"

// Conecta a la base de datos
@Module({
  imports: [
    UsuarioModule, ActividadModule, TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "integrador",
      entities: [join(__dirname, "**", "*.entity.{.ts,js}")],
      synchronize: false
    }),
    JwtModule.register({
      global: true,
      secret: "secreto",
      signOptions: {
        expiresIn: "5m"
      }
    }), AutenticacionModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
