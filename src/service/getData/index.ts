export async function getData(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro encontrado: ", error);
    return [];
  } finally {
    console.info("Fim da requisição");
  }
}
