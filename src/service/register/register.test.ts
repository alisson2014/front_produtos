import { register } from ".";

describe("HTTP POST DATA API", () => {
  test("Deve trazer status true da api", async () => {
    const mockUrlApi = "http://localhost/produtosLike/register/";
    const mockData = {
      id: null,
      nomeCategoria: "testeJest",
    };

    const data = await register(mockUrlApi, mockData);
    expect(data).toBeDefined();
  });

  test("Deve retornar um array vazio caso a requisição falhe", async () => {
    const mockUrlApi = "http://ltssazct";
    const mockData = {
      id: null,
      nomeCategoria: "testeJest",
    };

    const data = await register(mockUrlApi, mockData);
    expect(data).toEqual([]);
  });
});
