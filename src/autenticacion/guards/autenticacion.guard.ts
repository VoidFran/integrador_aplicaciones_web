import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { Roles } from "../decorators/roles.decorator"
import { UsuarioEntity } from "src/usuario/entities/usuario.entity"
import { UsuarioService } from "src/usuario/services/usuario.service"

@Injectable()
export class AutenticacionGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
   //private configService: ConfigService,
    private usuarioService: UsuarioService,
    private reflector: Reflector
  ){}

  // Retorna verdadero si tenemos permiso de acceder
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Trae los datos de las peticiones http
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        const expiro = this.isTokenExpired(token)

        // Verifica si hay token y si es valido
        if (!token) {
            throw new UnauthorizedException("No hay token")
        }
        else if (expiro) {
            throw new UnauthorizedException("Token inválido")
        }

        // Verifica si el token es valido
        const payload = await this.jwtService.verifyAsync(token)

        // Busca el usuario que corresponda con el token valido
        const usuario: UsuarioEntity = await this.usuarioService.buscarUsuarioId(payload.id)

        // Trae lo que se configuro en el decorador de roles
        const roles = await this.reflector.get(Roles, context.getHandler())

        // Si recibimos un token valido y no hay una restriccion de roles definida en el metodo que estamos custodiando, se va ejecutar ese metodo
        if (!roles) {
            request["usuario"] = usuario // Le asigna el usuario correspondiente a la clave del jwt
            return true
        }
        // Si hay una restriccion y roles existe, verifica el rol que tiene el usuario
        else if (roles.includes(usuario.rol)) {
            request["usuario"] = usuario
            return true
        }
        else if (!roles.includes(usuario.rol)) {
            throw new UnauthorizedException("Permisos insuficientes")
        }
    }

    // Extrae el token de la cabecera de datos
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers["authorization"]?.split(" ") ?? []
        return type === "Bearer" ? token : undefined
    }

    // Verifica si el token expiro o no
    private isTokenExpired(token: string) {
        try {
            const decodedToken = this.jwtService.verify(token)
            if (!decodedToken.exp) {
                return true // No hay tiempo de expiración en el token
            }
            const expirationDate = new Date(decodedToken.exp * 1000)
            const now = new Date()
            return expirationDate <= now
        } catch (error) {
            // El token es inválido o ha expirado
            return true
        }   
    }
}
