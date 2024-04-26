import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { LoginDto } from "../dtos/login.dto"
import { UsuarioEntity } from "../../usuario/entities/usuario.entity"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt"
import { UsuarioEstadoEnum } from "src/usuario/enums/usuario_estado.enum"

// Injectable se encarga de instanciar esta clase por nosotros
// Singleton crea un objeto de una instancia de una clase
@Injectable()

export class AutenticacionService {
    // El constructor contiene el servicio inyectado
    // A traves del repositorio accede a la base de datos
    constructor(
        @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>,
        private jwtService: JwtService
    ){}
    
    // Recibe el objeto del controller
    // Verifica si el usuario es valido 
    async login(loginDto: LoginDto): Promise<{ token: string }> {
        // Busca el usuario en la base de datos
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
            where: {
                nombre_usuario: loginDto.nombre_usuario,
                estado: UsuarioEstadoEnum.activo
            }
	    })

        // Si el usuario no es valido tira una excepcion
        if (!usuario) {
            console.log("Usuario no valido")
            throw new NotFoundException("Usuario no valido")
        }
        else if (usuario) {
            // Recibe un string y la clave hasheada para comparar
            const clave_correcta: boolean = bcrypt.compareSync(loginDto.clave, usuario.clave)

            // Si la clave no es valida tira una excepcion
            if (!clave_correcta) {
                console.log("Clave incorrecta")
                throw new NotFoundException("Clave incorrecta")
            }
            else {
                console.log(`Usuario con ID ${usuario.id} logeado`)
            
                // Firma el jwt con el secreto
                const token: string = this.jwtService.sign({
                    id: usuario.id,
                    rol: usuario.rol
                })

                return { token }
            }
        }
    }

}
