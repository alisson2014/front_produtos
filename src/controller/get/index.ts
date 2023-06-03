import { IHttpReq } from "interface";

export const getCategories: IHttpReq = {
  method: "GET",
  file: "categories",
};

export const getProducts: IHttpReq = {
  method: "GET",
  file: "products",
};
