import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";    
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../enviroments/enviroments";


@Injectable({
    providedIn: 'root'

})


export class AuthService{
    private jwtHelper = new JwtHelperService();
    constructor (private client: HttpClient, private router : Router){}


    login(nombre_usuario: string, clave: string): Observable<{ token: string}> {
        return this.client.post<{ token: string}> ( environment.apiUrl +'/login', {
            nombre_usuario,
            clave,
        } )
    }
    
    /**
     * 
     * @deprecated - Método con token
     *
     */
    setSession(token: string){
        sessionStorage.setItem('token',token);
    }

    /**
     * 
     * Salir de la sessión y remover el token de autentificación
     */

    logout(){
      console.log()
        sessionStorage.removeItem('token');
        this.router.navigateByUrl('login');
    }

    isLoggedIn(): boolean {
        const token = sessionStorage.getItem('token');
        if (!token) {
          return false;
        }
        return !new JwtHelperService().isTokenExpired(token);
      }

      hasRole() {
        const token = sessionStorage.getItem('token');
        if (!token) {
          return false;
        }
    
        return new JwtHelperService().decodeToken(token).rol;
      }
      getUsername(): string | null {
      const token = sessionStorage.getItem('token');
      if (!token) {
          return null;
        }
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken ? decodedToken.nombre_usuario : null;
    }
    
}









