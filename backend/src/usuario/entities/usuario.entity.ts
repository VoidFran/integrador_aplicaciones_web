
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UsuarioEstadoEnum } from "../enums/usuario_estado.enum"
import { UsuarioRolesEnum } from "../enums/usuario_roles.enum"
import { Exclude, Expose } from 'class-transformer';

// Nombre de la tabla en la base de datos
@Entity(({name: "usuario"}))

// Las campos de la tabla
// Cualquier cambio que se haga va tener efecto en la base de datos
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

	@Exclude()
    @Column()
    clave: string;

    @Column()
    apellido: string;

    @Column()
    nombre: string;

    @Column({ type: 'enum', enum: UsuarioEstadoEnum })
    estado: UsuarioEstadoEnum;

    @Column({ name: 'nombre_usuario' })
    nombre_usuario: string;

    @Column({ type: 'enum', enum: UsuarioRolesEnum })
    rol: UsuarioRolesEnum;

    // Guarda la fecha en el que se registro
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    fecha_registro: Date

    // Se usa mas que nada en el front
	@Expose()
	get nombre_completo(): string {
		return this.apellido + ', ' + this.nombre;
	}
}
