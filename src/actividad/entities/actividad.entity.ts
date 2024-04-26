import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { ActividadEstadoEnum } from "../enums/actividad_estado.enum"
import { ActividadPrioridadEnum } from "../enums/actividad_prioridad.enum"
import { UsuarioEntity } from "src/usuario/entities/usuario.entity"

// Nombre de la tabla en la base de datos
@Entity(({name: "actividad"}))

// Las campos de la tabla
// Cualquier cambio que se haga va tener efecto en la base de datos
export class ActividadEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	descripcion: string

    @Column({name: "id_usuario_actual"})
	id_usuario_actual: number // Contiene un id

	// Relaciona un objeto con otro respetando la estructura de la clave foranea de la base de datos
	@ManyToOne(() => UsuarioEntity)
	// Especifica cual es la columna de nuestra tabla con la que vamos a relacionar
	@JoinColumn({name: "id_usuario_actual"}) // Relaciona la actividad con un objeto de tipo usuario
	usuario_actual: UsuarioEntity // No solo treamos el id si no el objeto entero

	@Column({type: "enum", enum: ActividadPrioridadEnum, default: "baja"})
	prioridad: ActividadPrioridadEnum

	@Column({name: "id_usuario_modificacion"})
	id_usuario_modificacion: number // Contiene un id

	// Relaciona un objeto con otro respetando la estructura de la clave foranea de la base de datos
	@ManyToOne(() => UsuarioEntity)
	// Especifica cual es la columna de nuestra tabla con la que vamos a relacionar
	@JoinColumn({name: "id_usuario_modificacion"}) // Relaciona la actividad con un objeto de tipo usuario
	usuario_modificacion: UsuarioEntity // No solo treamos el id si no el objeto entero

    // Guarda la fecha en el que se registro
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    fecha_modificacion: Date

	@Column({type: "enum", enum: ActividadEstadoEnum, default: "pendiente"})
	estado: ActividadEstadoEnum

    // Guarda la fecha en el que se registro
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    fecha_registro: Date
}
