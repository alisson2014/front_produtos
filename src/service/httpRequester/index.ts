import { IHttpReq } from "interface";

export async function httpRequester(props: IHttpReq): Promise<any | never[]> {
  const { method, file, id, data } = props;
  let action: string = "";
  let uri: string = "";
  let requester: RequestInit = {};

  switch (method) {
    case "GET":
      action = "list";
      break;
    case "POST":
      action = "register";
      break;
    case "UPDATE":
      action = method.toLowerCase();
      break;
    case "DELETE":
      action = method.toLowerCase();
      break;
    default:
      throw new Error("Método não encontrado!");
  }

  if (method !== "DELETE")
    uri = `http://localhost/produtosLike/${action}/${file}.php`;
  else uri = `http://localhost/produtosLike/${action}/${file}.php?id=${id}`;

  if (method === "GET" || method === "DELETE") {
    requester = {
      method: method,
    };
  } else {
    requester = {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "applications/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  }

  try {
    const response = await fetch(uri, requester);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro encontrado: " + error);
    return [];
  }
}
