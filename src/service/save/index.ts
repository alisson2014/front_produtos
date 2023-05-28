export async function save(file: string, props: any): Promise<any | never[]> {
  let method = "POST";
  let action = "register";

  if (props?.id !== "") {
    method = "UPDATE";
    action = method.toLowerCase();
  }

  const uri = `http://localhost/produtosLike/${action}/${file}.php`;

  const requester: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "applications/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(props),
  };

  try {
    const response = await fetch(uri, requester);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
