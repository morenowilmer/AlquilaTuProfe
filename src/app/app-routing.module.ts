import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './siderbar/layout/layout.component';
import { NotFountComponent } from './not-fount/not-fount.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', redirectTo: 'login' },
  { path: '404', component: NotFountComponent },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(
        (module) => module.LoginModule
      ),
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./login/login.module').then(
            (module) => module.LoginModule
          ),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
