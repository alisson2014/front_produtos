type localStorage<T> = T[] | [];

interface IFormProps<T> {
  show: boolean;
  handleClose: () => void;
  props: T;
}

export type localCategories = localStorage<ICategories>;
export type localProducts = localStorage<IProducts>;
export type id = number | "";
export type FormCategories = IFormProps<ICategories>;
export type FormProducts = IFormProps<IProducts>;
export type method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HasId {
  id: id;
}

export interface ICategories {
  id: id;
  nomeCategoria: string;
}

export interface IProducts {
  id: id;
  nomeProduto: string;
  categoria: string | id;
  valor: number;
}

export interface ILinkTo {
  route: string;
  routeName: string;
}

export interface IDeleteFunction {
  id: id;
  deleted: string;
  typeData: string;
  file: string;
}

export interface IHttpReq {
  method: method;
  file: string;
  id?: id;
  data?: any;
}

export interface IErrorHandler {
  field: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
