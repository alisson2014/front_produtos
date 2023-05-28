export async function getData<T>(file: string): Promise<T[] | never[]> {
  try {
    const response = await fetch(
      `http://localhost/produtosLike/list/${file}.php`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro encontrado: ", error);
    return [];
  }
}
