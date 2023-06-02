import { ICategories, IProducts } from "interface";
import { RegisterOptions } from "react-hook-form";

export const optionsInputCategorie: RegisterOptions<ICategories, "nome"> = {
  required: true,
  minLength: 3,
  maxLength: 50,
};

export const optionsInputProducts: RegisterOptions<IProducts, "nome"> = {
  required: true,
  minLength: 3,
  maxLength: 50,
};
