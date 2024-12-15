import { TipoNotificacion } from "../model/tipo-notificacion";


export interface Toast {
  mensaje: string;
  tipo: TipoNotificacion
}
