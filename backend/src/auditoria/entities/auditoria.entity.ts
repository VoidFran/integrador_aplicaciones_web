import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"

import { UsuarioEntity } from "src/usuario/entities/usuario.entity"
import { AuditoriaPrioridadEnum } from "../enums/auditoria_prioridad.enum"
import { AuditoriaEstadoEnum } from "../enums/auditoria_estado.enum"

// Nombre de la tabla en la base de datos
@Entity(({name: "actividad_auditoria"}))

// Las campos de la tabla
// Cualquier cambio que se haga va tener efecto en la base de datos
export class AuditoriaEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	id_actividad: number

    @Column()
	descripcion: string

	// Relaciona un objeto con otro respetando la estructura de la clave foranea de la base de datos
	@ManyToOne(() => UsuarioEntity)
	// Especifica cual es la columna de nuestra tabla con la que vamos a relacionar
	@JoinColumn({name: "id_usuario_actual"}) // Relaciona la auditoria con un objeto de tipo usuario
	id_usuario_actual: UsuarioEntity // No solo treamos el id si no el objeto entero

	@Column({type: "enum", enum: AuditoriaPrioridadEnum, default: "baja"})
	prioridad: AuditoriaPrioridadEnum

	@Column({name: "id_usuario_modificacion"})
	id_usuario_modificacion: number // Contiene un id

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    fecha_modificacion: Date

	@Column({type: "enum", enum: AuditoriaEstadoEnum, default: "pendiente"})
	estado: AuditoriaEstadoEnum
}
