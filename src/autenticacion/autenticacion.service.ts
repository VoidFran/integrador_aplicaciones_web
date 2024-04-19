import { Injectable, BadRequestException} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { LoginDto } from "./login.dto"
import { UsuarioEntity } from "../usuario/usuario.entity"
import { UsuarioEstado } from "../usuario/usuario.enum"
import * as bcrypt from "bcrypt"

// Injectable se encarga de instanciar esta clase por nosotros
// Singleton crea un objeto de una instancia de una clase
@Injectable()

export class AutenticacionService {
    // El constructor contiene el servicio inyectado
    // A traves del repositorio accede a la base de datos
    constructor(
        @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>
    ){}
    
    // Recibe el objeto del controller
    // Verifica si el usuario es valido 
    async login(loginDto: LoginDto) {
        // Busca el usuario en la base de datos
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({
            where: {
                nombre_usuario: loginDto.nombre_usuario,
                estado: UsuarioEstado.activo
            }
	    })

        // Si el usuario no es valido tira una excepcion
        if(!usuario) {
            console.log("Nombre de usuario no valido")
            //throw new BadRequestException("Nombre de usuario no valido")
        }

        //console.log(usuario)
        //console.log(usuario.nombre_usuario)
        //console.log(usuario.clave)
        //console.log(loginDto.nombre_usuario)
        //console.log(loginDto.clave)

        // Recibe un string y la clave hasheada para comparar
        //const claveCorrecta: boolean = bcrypt.compareSync(loginDto.clave, usuario.clave)
        const claveCorrecta: boolean = (loginDto.clave == usuario.clave)
        console.log(typeof(loginDto.clave))
        console.log(typeof(usuario.clave))

        // Si la clave no es valida tira una excepcion
        if (!claveCorrecta) {
            console.log("Clave incorrecta")
            //throw new BadRequestException("Clave incorrecta")  
        }

        if (usuario && claveCorrecta) {
            console.log("Usuario logeado")
        }

    }
}
