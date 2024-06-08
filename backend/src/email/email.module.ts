/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EmailService } from './services/email.services';
import { EmailController } from './controllers/email.controller';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])],
    controllers: [EmailController],
    providers: [EmailService, UsuarioService],
    exports: []
})
export class EmailModule {}
