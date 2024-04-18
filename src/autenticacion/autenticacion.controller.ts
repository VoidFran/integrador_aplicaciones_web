import { Controller, Post, Body } from "@nestjs/common"
import { LoginDto } from "./login.dto"

// El endpoint
@Controller("login")

// El controlador brinda los endpoints de los servicios
export class AutenticacionController {
    // Los decoradores
    @Post()
    login(@Body() loginDto: LoginDto) {
        console.log("login")
    }
}
