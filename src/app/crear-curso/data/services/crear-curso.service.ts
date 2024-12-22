import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from 'src/app/core/interface/curso.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrearCursoService {

  private urlBase = environment.api_url;

  constructor(private http: HttpClient) { }

  categoriasPadres() {
    return this.http.get<any>(this.urlBase + 'categorias/listar-padres');
  }
  public categoriasHijos(idPadre: number) {
    return this.http.get<any>(this.urlBase + 'categorias/listar-subcategorias/'+idPadre);
  }
  registrar(curso: Curso) {
    return this.http.post<any>(this.urlBase + 'cursos/registrar', curso);
  }
}
