import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ActividadEntity } from "../entities/actividad.entity"
import { ActividadDto } from "../dtos/actividad.dto"
import { ActividadEstadoEnum } from "../enums/actividad_estado.enum"
import { UsuarioService } from "src/usuario/services/usuario.service"
import { UsuarioEntity } from "src/usuario/entities/usuario.entity"
import { UsuarioRolesEnum } from "src/usuario/enums/usuario_roles.enum"
import { ActividadEditarDto } from "../dtos/actividad_editar.dto"

// Injectable se encarga de instanciar esta clase por nosotros
// Singleton crea un objeto de una instancia de una clase
@Injectable()

// La implementacion de los servicios y la logica
export class ActividadService {
    // El constructor contiene el servicio inyectado
    // A traves del repositorio accede a la base de datos
    constructor(
        @InjectRepository(ActividadEntity)
        private actividadRepository: Repository<ActividadEntity>,
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

    async buscarActividadesPorIdUsuario(idUsuario: number): Promise<ActividadEntity[]> {
        return await this.actividadRepository.find({
            where: {
                id_usuario_actual: idUsuario
            }
        })
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
        
        // Guarda la actividad en la base de datos
        const crear_actividad = await this.actividadRepository.save(item)
        return crear_actividad
	}

    // Edita una actividad
    async editarActividad(id: number, actividadDto: ActividadEditarDto, UsuarioEntity: UsuarioEntity): Promise<ActividadEntity> {
        const actividad = await this.actividadRepository.findOne({ where: { id } })

        // Si no lo encuentra tira un exepcion
        if (!actividad) {
            throw new NotFoundException(`Actividad con ID ${id} no encontrada`)
        }

        // Obtiene el usuario que esta ejecutando la accion
        let actividad_usuario = new ActividadEntity()
        actividad_usuario.usuario_modificacion = UsuarioEntity // Forma por fuera del dto para saber cual usuario realiza la accion

        // Verifica que el usuario existe
        actividadDto.id_usuario_actual = await this.usuarioService.buscarUsuarioId(actividadDto.id_usuario_actual) // Obtiene el objeto correspondiente al usuario que pasaron en el dto

        if (actividad.id_usuario_actual) {
            // Actualizar solo las propiedades proporcionadas en actividadDto
            Object.assign(actividad, actividadDto)
            actividad.fecha_modificacion = new Date()
            actividad.id_usuario_modificacion = actividad_usuario.usuario_modificacion.id
    
            // Lo guarda en la base de datos
            const actividad_actualizada = await this.actividadRepository.save(actividad)
            return actividad_actualizada
        }
    }

    // Edita una actividad
    async finalizarActividad(id: number, estado: any, UsuarioEntity: UsuarioEntity): Promise<any> {
        // Busca las actividades pendientes
        const actividad = await this.actividadRepository.findOne({ where: { id, estado: ActividadEstadoEnum.pendiente } })

        // Si no lo encuentra tira una exepcion
        if (!actividad) {
            throw new NotFoundException(`Actividad con ID ${id} no encontrada`)
        }

        // Actualiza el campo deseado
        actividad.estado = estado.estado

        // Obtiene el usuario que esta ejecutando la accion
        let actividad_usuario = new ActividadEntity()
        actividad_usuario.usuario_modificacion = UsuarioEntity // Forma por fuera del dto para saber cual usuario realiza la accion

        let id_usuario_actual
        let id_usuario_actividad = actividad.id_usuario_actual

        // Un recorrido para obtener el id del usuario actual
        const entries = Object.entries(actividad_usuario.usuario_modificacion)
        entries.forEach(([key, value]) => {
            if (key === "id") {
                id_usuario_actual = value
            }
        })

        // Compara si el id del usuario actual corresponde con el de la actividad
        if (id_usuario_actual === id_usuario_actividad) {
            actividad.id_usuario_modificacion = id_usuario_actual

            // Guarda los cambios en la base de datos
            return await this.actividadRepository.save(actividad)
        }
    }

// Método para buscar una actividad por ID
async buscarActividadPorId(id: number): Promise<ActividadEntity> {
    const actividad = await this.actividadRepository.findOne({ where: { id } });

    if (!actividad) {
        throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    }
    return actividad;
}









    
}