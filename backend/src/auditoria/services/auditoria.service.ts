import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { AuditoriaEntity } from "../entities/auditoria.entity"
import { AuditoriaEstadoEnum } from "../enums/auditoria_estado.enum"
import { UsuarioEntity } from "src/usuario/entities/usuario.entity"
import { UsuarioRolesEnum } from "src/usuario/enums/usuario_roles.enum"

// Injectable se encarga de instanciar esta clase por nosotros
// Singleton crea un objeto de una instancia de una clase
@Injectable()

// La implementacion de los servicios y la logica
export class AuditoriaService {
    // El constructor contiene el servicio inyectado
    // A traves del repositorio accede a la base de datos
    constructor(
        @InjectRepository(AuditoriaEntity)
        private auditoriaRepository: Repository<AuditoriaEntity>
    ){}
    
    // Los metodos
    // (): lo que recibe por parametro
    // []: lo que devuelve

    // Busca las auditoriaes
    async buscarAuditoriaes(UsuarioEntity: UsuarioEntity): Promise<AuditoriaEntity[]> {
        // Guarda el rol del usuario logeado
        const rol: UsuarioRolesEnum = UsuarioEntity.rol

        // realiza una consulta especifica
        const consulta = this.auditoriaRepository.createQueryBuilder("actividad_auditoria").innerJoin("actividad_auditoria.id_usuario_actual", "usuario")
        // innerJoinandselect si queremos traer tambien los datos del usuario

        // Filtra si el usuario es ejecutor y la actividades asignadas a el, tambien si la auditoria esta pendiente
        if (rol === UsuarioRolesEnum.ejecutor) {
            consulta.where("actividad_auditoria.estado = :estado", {
                estado: AuditoriaEstadoEnum.pendiente
            }).andWhere("usuario.id = :id_usuario", {
                id_usuario: UsuarioEntity.id
            })
        }

        return await consulta.getMany()
    }
}