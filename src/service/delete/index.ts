export async function deleteData(
  file: string,
  id: any
): Promise<any | never[]> {
  const url = `http://localhost/produtosLike/delete/${file}.php?id=${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro encontrado: ", error);
    return [];
  }
}
