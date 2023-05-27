type localStorage<T> = T[] | null;

interface IFormProps<T> {
  show: boolean;
  handleClose: () => void;
  props: T;
}

export type localCategories = localStorage<ICategories>;
export type localProducts = localStorage<IProducts>;
export type id = number | string;
export type FormCategories = IFormProps<ICategories>;
export type FormProducts = IFormProps<IProducts>;

export interface ICategories {
  id: id;
  nome: string;
}

export interface IProducts {
  id: id;
  nome: string;
  nomeCategoria: string;
  valor: number;
}

export interface ILinkTo {
  route: string;
  routeName: string;
}
