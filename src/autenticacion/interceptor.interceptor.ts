import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // Aquí puedes obtener el token de tu método de autenticación o de donde lo tengas almacenado
        const token = "tu-token"

        // Obtener la solicitud HTTP
        const request = context.switchToHttp().getRequest()

        // Agregar el token al encabezado de la solicitud
        request.headers["Authorization"] = `Bearer ${token}`
        console.log(request.headers["Authorization"] = `Bearer ${token}`)

        return next.handle()
    }
    
    //async getToken(usuario){
        // Firma el jwt con el secreto
    //    const token: string = this.jwtService.sign({
    //        id: usuario.id,
    //        rol: usuario.rol
    //    })

    //return { token}       
    //}  
}
