import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './siderbar/layout/layout.component';
import { NotFountComponent } from './not-fount/not-fount.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((module) => module.LoginModule),
  },
  {
    path: 'registrar',
    loadChildren: () =>
      import('./registro/registro.module').then(
        (module) => module.RegistroModule
      ),
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((module) => module.HomeModule),
      },
      {
        path: 'crear-curso',
        loadChildren: () =>
          import('./crear-curso/crear-curso.module').then((module) => module.CrearCursoModule),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
  { path: '404', component: NotFountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
