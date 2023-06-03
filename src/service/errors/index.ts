import { IErrorHandler } from "interface";

export const errorHandler = (
  inputError: string,
  props: IErrorHandler
): string => {
  const { field, minLength, maxLength, min, max } = props;
  let errorMessage: string = "";

  switch (inputError) {
    case "required":
      errorMessage = `${field} é obrigatório.`;
      break;
    case "minLength":
      errorMessage = `Digite ${minLength} ou mais caracteres.`;
      break;
    case "maxLength":
      errorMessage = `Digite no máximo ${maxLength} caracteres`;
      break;
    case "min":
      errorMessage = `Valor minimo: ${min}`;
      break;
    case "max":
      errorMessage = `Valor máximo: ${max}`;
      break;
  }

  return errorMessage;
};
