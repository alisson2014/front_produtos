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

  const uri = "http://localhost:8080" + file + queryParam;

  if (method === "PUT" || method === "POST") {
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
