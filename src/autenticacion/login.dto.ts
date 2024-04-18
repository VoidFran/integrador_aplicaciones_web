import { IsNotEmpty, IsString } from "class-validator"

export class LoginDto {

    // Los decoradores
    @IsString()
    @IsNotEmpty()
    nombreUsuario: string
    clave: string
}