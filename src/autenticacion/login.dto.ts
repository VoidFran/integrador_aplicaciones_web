import { IsNotEmpty, IsString } from "class-validator"

export class LoginDto {
    // Los decoradores
    @IsString()
    @IsNotEmpty()
    nombre_usuario: string
    clave: string
}
