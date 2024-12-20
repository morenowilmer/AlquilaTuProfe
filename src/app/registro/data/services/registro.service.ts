import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/interface/persona.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }
  
    tiposDocumentos(): Observable<any> {  
      return this.http.get<any>(environment.api_url + 'persona/tipos-documentos');
    }

    registrar(usuario: Usuario) {
      return this.http.post<any>(environment.api_url + 'usuario/registrar', usuario);
    }
}
