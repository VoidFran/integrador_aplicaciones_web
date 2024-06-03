import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroments';
import { UsuarioDto } from '../dtos/usuario.dto';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private httpClient: HttpClient) {}

  
  getUsuarios(): Observable<UsuarioDto[]> {
    return this.httpClient.get<UsuarioDto[]>(`${environment.apiUrl}/usuarios`);
  }

  getUsuario(id: number): Observable<UsuarioDto> {
    return this.httpClient.get<UsuarioDto>(`${environment.apiUrl}/usuarios/${id}`);;
  }


  
  crearUsuario(usuario: UsuarioDto): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/usuarios`, usuario);
  }

 
  editarUsuario(id: number, usuario: UsuarioDto): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/usuarios/${id}`, usuario);
  }

 
  eliminarUsuario(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/usuarios/${id}`);
  }
}
