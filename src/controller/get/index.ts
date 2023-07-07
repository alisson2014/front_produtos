import { IHttpReq } from "interface";

export const getCategories: IHttpReq = {
  method: "GET",
  file: "/categorias",
};

export const getProducts: IHttpReq = {
  method: "GET",
  file: "products",
};
