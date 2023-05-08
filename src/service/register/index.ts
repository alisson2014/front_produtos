export async function register(url: string, props: any): Promise<any> {
  const requester = {
    method: "POST",
    headers: {
      "Content-Type": "applications/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(props),
  };

  try {
    const response = await fetch(url, requester);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    console.info("Fim da requisição");
  }
}
