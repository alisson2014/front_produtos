export async function getData<T>(file: string): Promise<T[] | never[]> {
  const uri = `http://localhost/produtosLike/list/${file}.php`;

  try {
    const response = await fetch(uri);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro encontrado: ", error);
    return [];
  }
}
