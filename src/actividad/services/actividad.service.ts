import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ActividadEntity } from "../entities/actividad.entity"
import { ActividadDto } from "../dtos/actividad.dto"
import { ActividadEstadoEnum } from "../enums/actividad_estado.enum"
import { UsuarioService } from "src/usuario/services/usuario.service"
import { UsuarioEntity } from "src/usuario/entities/usuario.entity"

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

    // Busca los usuarios activos
    async buscarActividades(): Promise<ActividadEntity[]> {
        const actividades: ActividadEntity[] = await this.actividadRepository.find({})
        return actividades
    }

    async crearActividad(actividad: ActividadDto, UsuarioEntity: UsuarioEntity): Promise<any> {
        let item = new ActividadEntity()
        console.log(item)
        item.descripcion = actividad.descripcion
        console.log(item)
        item.estado = ActividadEstadoEnum.pendiente
        item.fecha_modificacion =  new Date()
        item.prioridad = actividad.prioridad
        item.usuario_actual = await this.usuarioService.buscarUsuarioId(actividad.id_usuario_actual) // Obtiene el objeto correspondiente al usuario que pasaron en el dto
        item.usuario_modificacion = UsuarioEntity // Forma por fuera del dto para saber cual usuario realiza la accion
        console.log(item)
        const crear_actividad = await this.actividadRepository.save(item)
        return crear_actividad
	}
}