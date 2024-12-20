import { TipoDocumento } from "./tipo-documento.interface";

export interface Usuario {
    id: number | null;
    nombre: string;
    apellido: string;
    tipoDocumento: TipoDocumento;
    identificacion: string;
    celular: string;
    correo: string;
    contrasena: string;
    fechaNacimiento: Date;
    departamento: string;
    ciudad: string;
    direccion: string;
    fotoBase64: string | null;
}
  