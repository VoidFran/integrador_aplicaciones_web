import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";    
import { Observable } from "rxjs";
import { RolesEnum } from "../enums/roles.enum";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
    providedIn: 'root'

})


export class AuthService{
    constructor (private client: HttpClient, private router : Router){}


    login(nombre_usuario: string, clave: string): Observable<{ token: string}> {
        return this.client.post<{ token: string}> ( 'http://localhost:3000/login', {
            nombre_usuario,
            clave,
        } )
    }

    setSession(token: string){
        sessionStorage.setItem('token',token);
    }

    logout(){
      console.log(8)
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

}









