export enum TipoUsuario {
  FOMENTAMOS = 'FOMENTAMOS',
  BANCO_OPORTUNIDADES = 'BANCO_OPORTUNIDADES',
}

export enum TipoUsuarioMain {
  'FOMENTAMOS' = 'fom',
  'BANCO_OPORTUNIDADES' = 'bop',
}

export enum IdAplciacionEnum{
  'FOMENTAMOS' = '123bc58f-1354-4bea-a4d9-ef2cd99450f0'
}

export interface Menu {
  tipoUsuario: TipoUsuario;
  itemsMenu: ItemMenu[];
}

export interface ItemMenu {
  id: number;
  orden: number;
  uri: string;
  icono: string;
  nombre: string;
  parent?: string;
  subMenus?: ItemSubMenu[];
}

export interface ItemSubMenu {
  id: number;
  orden: number;
  uri: string;
  icono: string;
  nombre: string;
  parent?: string;
}

export interface TipoUsuarioAplicacion {
  tipoUsuario?: TipoUsuario;
  aplicacion?: TipoUsuarioMain;
}
