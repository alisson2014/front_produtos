type localStorage<T> = T[] | null;
export type localCategories = localStorage<ICategories>;

export interface ICategories {
  id: string;
  nome: string;
}

export interface IProducts {
  id: string;
  nome: string;
  nomeCategoria: string;
  valor: number;
}

export interface ILinkTo {
  route: string;
  routeName: string;
}
