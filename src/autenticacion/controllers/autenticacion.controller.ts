import { Controller, Post, Body } from "@nestjs/common"
import { LoginDto } from "../dtos/login.dto"
import { AutenticacionService } from "../services/autenticacion.service"

// El endpoint
@Controller("/login")

// El controlador brinda los endpoints de los servicios
export class AutenticacionController {
    // Verifica si el usuario es valido
    constructor(private usuariosService: AutenticacionService){

    }

    // Los decoradores
    @Post()
    // Body mapea el cuerpo del html a un objeto
    async login(@Body() loginDto: LoginDto) {
        return await this.usuariosService.login(loginDto)
    }
}
