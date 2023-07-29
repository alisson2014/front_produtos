import { httpRequester } from "./httpRequester";
import { useLocalStorage } from "./useLocalStorage";
import { errorHandler } from "./errors";
import { getCategories, getProducts } from "./get";
import { deleteFn } from "./deleteFn";
import { saveFn } from "./saveFn";

export { 
    httpRequester, 
    useLocalStorage, 
    errorHandler,
    getCategories,
    getProducts,
    deleteFn,
    saveFn
};
