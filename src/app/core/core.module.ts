import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MensajeService } from './services/mensaje.service';
import { ValidacionFormularioService } from './services/validacion-formulario.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    MatSnackBarModule,
  ],
  providers: [
    ToastrService,
    MensajeService,
    ValidacionFormularioService
  ]
})
export class CoreModule { }
