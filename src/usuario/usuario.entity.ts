import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { UsuarioEstado } from "./usuario.enum"

// Nombre de la tabla en la base de datos
@Entity(({name: "usuario"}))

// Las campos de la tabla
// Cualquier cambio que se haga va tener efecto en la base de datos
export class UsuarioEntity{
	@PrimaryGeneratedColumn()
	id: number

	@Column(({name: "email"}))
	email: string

    @Column()
	clave: string

	@Column()
	nombre: string

	@Column()
	apellido: string

	@Column(({type: "enum", enum: UsuarioEstado}))
	estado: UsuarioEstado

	@Column()
	nombre_usuario: string

	@Column()
	rol: string

    // Guarda la fecha en el que se registro
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    fecha_registro: Date
}
