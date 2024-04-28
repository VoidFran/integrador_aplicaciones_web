import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { UsuarioEntity } from "../entities/usuario.entity"
import { UsuarioDto } from "../dtos/usuario.dto"
import * as bcrypt from "bcrypt"
import { UsuarioEstadoEnum } from "../enums/usuario_estado.enum"

// Injectable se encarga de instanciar esta clase por nosotros
// Singleton crea un objeto de una instancia de una clase
@Injectable()

// La implementacion de los servicios y la logica
export class UsuarioService {
    // El constructor contiene el servicio inyectado
    // A traves del repositorio accede a la base de datos
    constructor(
        @InjectRepository(UsuarioEntity) private usuarioRepository: Repository<UsuarioEntity>){}

    // Los metodos
    // (): lo que recibe por parametro
    // []: lo que devuelve

    // Busca los usuarios activos
    async buscarUsuarios(): Promise<UsuarioEntity[]> {
        // Busca los usuarios activos
        const usuarios: UsuarioEntity[] = await this.usuarioRepository.find({
            where: {
              estado: UsuarioEstadoEnum.activo
            }
        })
        return usuarios
    }

    // Busca un usuario activo por id
    async buscarUsuarioId(id: number): Promise<any> {
        const usuario = await this.usuarioRepository.findOneBy({id})

        // Si no lo encuentra tira una exepcion
        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`)
        }
        else if (usuario.estado === "no_activo") {
            throw new NotFoundException(`Usuario con ID ${id} no activo`)
        }
        return usuario
    }

    // Añade un usuario
	async agregarUsuario(usuario: UsuarioDto): Promise<any> {
        // Crea el usuario
	    let item = new UsuarioEntity()
        item.email = usuario.email
        const salt_rounds = 10 // Puedes ajustar este número según tus necesidades
        item.clave = await bcrypt.hash(usuario.clave, salt_rounds)
        item.nombre = usuario.nombre
        item.apellido = usuario.apellido
        item.estado = UsuarioEstadoEnum.activo
        item.nombre_usuario = usuario.nombre_usuario
        item.rol = usuario.rol

        // Guarda el usuario en la base de datos
        const crear_usuario = await this.usuarioRepository.save(item)
        return crear_usuario
    }

    // Edita un usuario
    async editarUsuario(id: number, usuarioDto: UsuarioDto): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne({ where: { id } })

        // Si no lo encuentra tira una exepcion
        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`)
        }

        // Actualizar solo las propiedades proporcionadas en usuarioDto
        Object.assign(usuario, usuarioDto)

        // Si la contraseña está presente, hashearla antes de guardar
        if (usuarioDto.clave) {
            const saltRounds = 10
            usuario.clave = await bcrypt.hash(usuarioDto.clave, saltRounds)
        }

        // Guarda el usuario en la base de datos
        const usuario_actualizado = await this.usuarioRepository.save(usuario)
        return usuario_actualizado
    }

    // Borra un usuario, mas bien lo pone no_activo
    async borrarUsuario(id: number): Promise<UsuarioEntity> {
        // Busca el usuario en la base de datos
        const usuario = await this.buscarUsuarioId(id)

        // Si lo encuentra lo desactiva
        if (usuario != null) {
            usuario.estado = "no_activo"
            return this.usuarioRepository.save(usuario)
            //await this.usuarioRepository.delete(id)
        }

        // Si no lo encuentra tira una exepcion
        else if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`)
        }
    }
}
