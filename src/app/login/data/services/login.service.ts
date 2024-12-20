import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {

  private urlBase = environment.api_url;

  constructor(private http: HttpClient) { }

  login(correo: string, contrasena: string): Observable<any> {
    var userLogin = {
      correo: correo,
      contrasena: contrasena
    }

    return this.http.post<any>(this.urlBase + 'login/login', userLogin);
  }

  logout() {
    return this.http.put<any>(this.urlBase + 'login/cerrar-sesion', null);
  }

  public estaLogeado(){
    return (this.obtenerUuid());
  }

  obtenerUuid() {
    return localStorage.getItem('token');
  }
}

