import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { UsuarioEntity } from "./usuario.entity"
import { UsuarioDto } from "./usuario.interfaz"
import * as bcrypt from "bcrypt"
import { UsuarioEstadoEnum } from "./usuario_estado.enum"
import { UsuarioRolesEnum } from "./usuario_roles.enum"

// Injectable se encarga de instanciar esta clase por nosotros
// Singleton crea un objeto de una instancia de una clase
@Injectable()

// La implementacion de los servicios y la logica
export class UsuarioService {
    // El constructor contiene el servicio inyectado
    // A traves del repositorio accede a la base de datos
    constructor(
        @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>
    ){}

    // Los metodos
    // (): lo que recibe por parametro
    // []: lo que devuelve
    async getAllUsuarios(): Promise<UsuarioEntity[]> {
        const usuarios: UsuarioEntity[] = await this.usuarioRepository.find({
            where: {
              estado: UsuarioEstadoEnum.activo
            }
        })
        return usuarios
    }

    async getUsuarioById(id: number): Promise<any> {
        const usuario = await this.usuarioRepository.findOne({
            where: {
                id,
                estado: UsuarioEstadoEnum.activo
            }
        })
        return usuario
    }

	async addUsuario(usuario: UsuarioDto): Promise<any> {
	    let item = new UsuarioEntity()
        item.email = usuario.email
        const salt_rounds = 10 // Puedes ajustar este número según tus necesidades
        item.clave = await bcrypt.hash(usuario.clave, salt_rounds)
        item.nombre = usuario.nombre
        item.apellido = usuario.apellido
        item.estado = UsuarioEstadoEnum.activo
        item.nombre_usuario = usuario.nombre_usuario
        item.rol = UsuarioRolesEnum.administrador
        const new_usuario = await this.usuarioRepository.save(item)
        return new_usuario
    }

    //async editUsuario(id: number, usuario: UsuarioEntity): Promise<any> {
    //    let toUpdate = await this.usuarioRepository.findOneBy({id})
    //    let update = Object.assign(toUpdate, usuario)
    //    const usuario_update = await this.usuarioRepository.save(toUpdate)
    //}

    async deleteUsuario(id: number): Promise<void> {
        const usuario = await this.getUsuarioById(id)
        if (usuario != null) {
            console.log("usuario borrado")
            await this.usuarioRepository.delete(id)
            return usuario
        }
        else {
            const texto = console.log("usuario no encontrado")
            return texto
        }
    }
}
