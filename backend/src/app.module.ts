import { EmailModule } from './email/email.module';
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { join } from "path"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AutenticacionModule } from "./autenticacion/autenticacion.module"
import { JwtModule } from "@nestjs/jwt"
import { UsuarioModule } from "./usuario/usuario.module"
import { ActividadModule } from "./actividad/actividad.module"
import { CsvModule } from "./csv/csv.module"
import { AuditoriaModule } from "./auditoria/auditoria.module"
import { MailerModule } from '@nestjs-modules/mailer';

// Conecta a la base de datos
@Module({
  imports: [
    AutenticacionModule, UsuarioModule, ActividadModule, AuditoriaModule, CsvModule, EmailModule, TypeOrmModule.forRoot({
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
        expiresIn: "100m"
      }
    }),MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: "franciscof2menosf1@gmail.com",
          pass: "beuqpjvyitiamosv"
        }
	    },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
