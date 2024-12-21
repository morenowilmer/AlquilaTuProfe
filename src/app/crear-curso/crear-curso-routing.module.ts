import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrearCursoComponent } from './crear-curso/crear-curso.component';

const routes: Routes = [
  {path: '', component: CrearCursoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearCursoRoutingModule { }
