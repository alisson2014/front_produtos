import { getData } from ".";

describe("HTTP GET DATA API", () => {
  test("Deve trazer os dados da api", async () => {
    const mockUrlApi = "http://localhost/produtosLike/";
    const data = await getData(mockUrlApi);
    expect(data).toBeDefined();
  });

  test("Deve retornar um array vazio caso de erro", async () => {
    const url = "http//apiIvalida";
    const data = await getData(url);
    expect(data).toEqual([]);
  });
});
