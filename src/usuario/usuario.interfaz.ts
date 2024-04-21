// Un dto es un objeto acotado de la clase que representa y permite la transferencia de datos
// No se necesita la id, va tomar valor cuando se añadan a la base de datos

export interface UsuarioDto {
    email: string
    clave: string
    nombre: string
    apellido: string
    estado: string
    nombre_usuario: string
    rol: string
}