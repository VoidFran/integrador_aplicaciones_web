import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { EmailService } from '../services/email.services';
import { AutenticacionGuard } from "src/autenticacion/guards/autenticacion.guard"
import { Roles } from "src/autenticacion/decorators/roles.decorator"
import { UsuarioRolesEnum } from "../../usuario/enums/usuario_roles.enum"
import { EmailDto } from '../dtos/email.dto';

@Controller("/email")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() email: EmailDto): Promise<any> {
    console.log(email)
    await this.emailService.sendEmail(email);
    return 'Email sent successfully';
  }
}
