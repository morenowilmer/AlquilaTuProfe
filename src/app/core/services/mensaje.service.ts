/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Toast } from '../interface/toast';
import { TipoNotificacion } from '../model/tipo-notificacion';

@Injectable()
export class MensajeService {

  private notificationSubject: Subject<Toast> = new Subject<Toast>();

  constructor
  (
    private _snackBar: MatSnackBar,
    private toastrService: ToastrService
  )
  {
    this.escucharMensajes();
  }

  openSnackBar(mensaje: string, tipoMensaje: string, tiempo: number = 5) {
    this._snackBar.open(mensaje, tipoMensaje, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: tiempo * 1000,
      
    });
  }

  enviarMensaje(message: Toast) {
    this.notificationSubject.next(message);
  }

  escucharMensajes() {
    this.notificationSubject.subscribe(mensaje => {
        switch (mensaje.tipo) {
            case TipoNotificacion.exito:
                this.toastrService.success(mensaje.mensaje);
                break;
            case TipoNotificacion.error:
                this.toastrService.error(mensaje.mensaje);
                break;
            case TipoNotificacion.alerta:
                this.toastrService.warning(mensaje.mensaje);
                break;
            case TipoNotificacion.info:
                this.toastrService.info(mensaje.mensaje);
                break;
            default:
            case null:
                this.toastrService.info(mensaje.mensaje);
                break;
        }
    });
  }
}
