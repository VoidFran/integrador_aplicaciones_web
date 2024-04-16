import { UsuarioModule } from './usuario/usuario.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Conecta a la base de datos
@Module({
  imports: [
    UsuarioModule, TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "integrador",
      entities: [join(__dirname, "**", "*.entity.{.ts,js}")],
      synchronize: true
    })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
