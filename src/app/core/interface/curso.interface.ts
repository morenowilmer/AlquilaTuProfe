export interface Curso {
    id: number | null;
    idCategoria: number;
    idProfesor: number;
    nombre: string;
    descripcion: string;
    nroHoras: number;
    valorHora: number;
    imagen: string;
    fechaInicio: Date;
    fechaFin: Date;
}