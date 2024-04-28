import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ActividadEntity } from "../entities/actividad.entity"
import { ActividadDto } from "../dtos/actividad.dto"
import { ActividadEstadoEnum } from "../enums/actividad_estado.enum"
import { UsuarioService } from "src/usuario/services/usuario.service"
import { UsuarioEntity } from "src/usuario/entities/usuario.entity"
import { UsuarioRolesEnum } from "src/usuario/enums/usuario_roles.enum"
import { UsuarioEstadoEnum } from "src/usuario/enums/usuario_estado.enum"

// Injectable se encarga de instanciar esta clase por nosotros
// Singleton crea un objeto de una instancia de una clase
@Injectable()

// La implementacion de los servicios y la logica
export class ActividadService {
    // El constructor contiene el servicio inyectado
    // A traves del repositorio accede a la base de datos
    constructor(
        @InjectRepository(ActividadEntity) private actividadRepository: Repository<ActividadEntity>,
        private usuarioService: UsuarioService
    ){}
    
    // Los metodos
    // (): lo que recibe por parametro
    // []: lo que devuelve

    // Busca las actividades
    async buscarActividades(UsuarioEntity: UsuarioEntity): Promise<ActividadEntity[]> {
        // Guarda el rol del usuario logeado
        const rol: UsuarioRolesEnum = UsuarioEntity.rol

        // realiza una consulta especifica
        const consulta = this.actividadRepository.createQueryBuilder("actividad").innerJoin("actividad.usuario_actual", "usuario")
        // innerJoinandselect si queremos traer tambien los datos del usuario

        // Filtra si el usuario es ejecutor y las actividades asignadas a el, tambien si la actividad esta pendiente
        if (rol === UsuarioRolesEnum.ejecutor) {
            consulta.where("actividad.estado = :estado", {
                estado: ActividadEstadoEnum.pendiente
            }).andWhere("usuario.id = :id_usuario", {
                id_usuario: UsuarioEntity.id
            })
        }
        return await consulta.getMany()
    }

    // Añade una actividad con clave foranea
    async crearActividad(actividad: ActividadDto, UsuarioEntity: UsuarioEntity): Promise<any> {
        let item = new ActividadEntity()
        //const item: ActividadEntity = this.actividadRepository.create()
        item.descripcion = actividad.descripcion
        item.usuario_actual = await this.usuarioService.buscarUsuarioId(actividad.id_usuario_actual) // Obtiene el objeto correspondiente al usuario que pasaron en el dto
        item.prioridad = actividad.prioridad
        item.usuario_modificacion = UsuarioEntity // Forma por fuera del dto para saber cual usuario realiza la accion
        item.fecha_modificacion = new Date()
        item.estado = ActividadEstadoEnum.pendiente
        item.fecha_registro = new Date()
        const crear_actividad = await this.actividadRepository.save(item)
        return crear_actividad
	}

    // Edita una actividad
    async editarActividad(id: number, actividadDto: ActividadDto): Promise<ActividadEntity> {
        const actividad = await this.actividadRepository.findOne({ where: { id } })
        if (!actividad) {
            throw new NotFoundException(`Actividad con ID ${id} no encontrada`)
        }

        // Actualizar solo las propiedades proporcionadas en actividadDto
        Object.assign(actividad, actividadDto)

        const actividad_actualizada = await this.actividadRepository.save(actividad)
        return actividad_actualizada
    }
}