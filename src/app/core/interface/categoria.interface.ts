export interface Categoria {
    id: number | null;
    idCategoriaPadre: number | null;
    nombre: string;
    descripcion: string;
    activo: string;
    imagen: string;
    subCategorias: Categoria[] | null;
}