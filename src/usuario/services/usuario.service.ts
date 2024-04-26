import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { UsuarioEntity } from "../entities/usuario.entity"
import { UsuarioDto } from "../dtos/usuario.dto"
import * as bcrypt from "bcrypt"
import { UsuarioEstadoEnum } from "../enums/usuario_estado.enum"
import { UsuarioRolesEnum } from "../enums/usuario_roles.enum"

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

    // Busca los usuarios activos
    async getAllUsuarios(): Promise<UsuarioEntity[]> {
        const usuarios: UsuarioEntity[] = await this.usuarioRepository.find({
            where: {
              estado: UsuarioEstadoEnum.activo
            }
        })
        console.log("Usuarios encontrados")
        return usuarios
    }

    // Busca un usuario activo por id
    async getUsuarioById(id: number): Promise<any> {
        const usuario = await this.usuarioRepository.findOne({
            where: {
                id,
                estado: UsuarioEstadoEnum.activo
            }
        })
        if (!usuario) {
            console.log("Usuario no encontrado")
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`)
        }
        console.log(`Usuario con ID ${id} encontrado`)
        return usuario
    }

    // Añade un usuario
	async addUsuario(usuario: UsuarioDto): Promise<any> {
	    let item = new UsuarioEntity()
        item.email = usuario.email
        const salt_rounds = 10 // Puedes ajustar este número según tus necesidades
        item.clave = await bcrypt.hash(usuario.clave, salt_rounds)
        item.nombre = usuario.nombre
        item.apellido = usuario.apellido
        item.estado = UsuarioEstadoEnum.activo
        item.nombre_usuario = usuario.nombre_usuario
        item.rol = usuario.rol
        const new_usuario = await this.usuarioRepository.save(item)
        console.log("Usuario añadido")
        return new_usuario
    }

    async editUsuario(id: number, usuarioDto: UsuarioDto): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne({ where: { id } })
        if (!usuario) {
            console.log(`Usuario con ID ${id} no encontrado`)
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`)
        }

        // Actualizar solo las propiedades proporcionadas en usuarioDto
        Object.assign(usuario, usuarioDto)

        // Si la contraseña está presente, hashearla antes de guardar
        if (usuarioDto.clave) {
            const saltRounds = 10
            usuario.clave = await bcrypt.hash(usuarioDto.clave, saltRounds)
        }

        console.log(`Usuario con ID ${id} editado`)
        const usuarioActualizado = await this.usuarioRepository.save(usuario)
        return usuarioActualizado
    }

    // Borra un usuario
    async deleteUsuario(id: number): Promise<void> {
        const usuario = await this.getUsuarioById(id)
        if (usuario != null) {
            console.log("Usuario borrado")
            await this.usuarioRepository.delete(id)
            return usuario
        }
        else if (!usuario) {
            console.log(`Usuario con ID ${id} no encontrado`)
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`)
        }
    }
}
