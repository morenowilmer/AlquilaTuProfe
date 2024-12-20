/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class LayoutService {
  private urlBase = environment.api_url;

  constructor(private http: HttpClient) {}

  public obtenerDatosUsuarioLogueado(usuario: string): Observable<any> {
    return this.http
      .get<any>(this.urlBase + `usuarios/retornar-usuario/${usuario}`)
      .pipe(
        map((res) => {
          return res.respuesta;
        })
      );
  }

  // public cambiarEstadoUuid(uuid: string) {
  //   return this.http.put<any>(this.urlSeguridad + 'cambiar-estado-offline/' + uuid, '').pipe(
  //     map((resp: any) => {
  //       return resp;
  //     })
  //   );
  // }
}
