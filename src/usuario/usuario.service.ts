import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { UsuarioEntity } from "./usuario.entity"
import { UsuarioDto } from "./usuario.interfaz"

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
    getAllUsuarios(): Promise<UsuarioEntity[]> {
        return this.usuarioRepository.find()
    }

    //getUsuarioById(id: number): Promise<UsuarioEntity> {
    //    return this.usuarioRepository.findOneBy({id})
    //}

	async addUsuario(usuario: UsuarioDto): Promise<any> {
	    let item = new UsuarioEntity()
        item.email = usuario.email
        item.clave = usuario.clave
        item.nombre = usuario.nombre
        item.apellido = usuario.apellido
        item.estado = usuario.UsuarioEstado
        item.nombre_usuario = usuario.nombre_usuario
        item.rol = usuario.rol
        const new_usuario = await this.usuarioRepository.save(item)
        return new_usuario
    }

    //async editUsuario(id: number, usuario: UsuarioEntity): Promise<any> {
    //    let toUpdate = await this.usuarioRepository.findOneBy({id})
    //    let update = Object.assign(toUpdate, usuario)
    //    const usuario_update = await this.usuarioRepository.save(toUpdate)
    //}

    async deleteUsuario(id: number): Promise<void> {
        await this.usuarioRepository.delete(id)
    }
}
