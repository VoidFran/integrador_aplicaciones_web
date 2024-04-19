import { Controller, Post, Body } from "@nestjs/common"
import { LoginDto } from "./login.dto"
import { AutenticacionService } from "./autenticacion.service"

// El endpoint
@Controller("login")

// El controlador brinda los endpoints de los servicios
export class AutenticacionController {
    // Verifica si el usuario es valido
    constructor(private usuariosService: AutenticacionService){

    }

    // Los decoradores
    @Post()
    // Body mapea el cuerpo del html a un objeto
    login(@Body() loginDto: LoginDto) {
        this.usuariosService.login(loginDto)
    }
}
