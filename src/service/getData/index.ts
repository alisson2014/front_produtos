export async function getData(file: string): Promise<any> {
  try {
    const response = await fetch(
      `http://localhost/produtosLike/list/${file}.php`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro encontrado: ", error);
    return [];
  } finally {
    console.info("Fim da requisição");
  }
}
