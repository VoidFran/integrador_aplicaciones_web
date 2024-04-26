import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { UsuarioEstadoEnum } from "../enums/usuario_estado.enum"
import { UsuarioRolesEnum } from "../enums/usuario_roles.enum"

// Nombre de la tabla en la base de datos
@Entity(({name: "usuario"}))

// Las campos de la tabla
// Cualquier cambio que se haga va tener efecto en la base de datos
export class UsuarioEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	email: string

    @Column()
	clave: string

	@Column()
	nombre: string

	@Column()
	apellido: string

	@Column({type: "enum", enum: UsuarioEstadoEnum, default: "activo"})
	estado: UsuarioEstadoEnum

	@Column()
	nombre_usuario: string

	@Column({type: "enum", enum: UsuarioRolesEnum})
	rol: UsuarioRolesEnum

    // Guarda la fecha en el que se registro
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    fecha_registro: Date
}
