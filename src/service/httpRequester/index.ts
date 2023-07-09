import { IHttpReq } from "interface";

export async function httpRequester(props: IHttpReq): Promise<any | never[]> {
  const { method, file, id = "", data } = props;
  let requester: RequestInit = {
    method: method,
  };

  let queryParam = "";

  if (id !== "") {
    queryParam = "?id=" + id;
  }

  const uri = "http://localhost:8080/" + file + queryParam;

  if (method === "PUT" || method === "POST") {
    requester = {
      method: method,
      mode: "cors",
      headers: {
        "Access-Control-Allow-Methods": "OPTIONS, GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Content-Type": "applications/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    };
  } 

  try {
    const response = await fetch(uri, requester);
    if (response.status === 204) {
      return response.status;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro encontrado: " + error);
    return [];
  }
}
