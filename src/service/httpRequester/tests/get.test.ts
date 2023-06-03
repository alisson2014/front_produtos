import { httpRequester } from "..";

describe("HTTP METHOD GET", () => {
  test("Deve trazer os dados da api", async () => {
    const response = await httpRequester({
      method: "GET",
      file: "categories",
    });
    expect(response).toBeDefined();
  });

  test("Deve retornar um array vazio em caso de erro", async () => {
    const response = await httpRequester({
      method: "GET",
      file: "fileError",
    });
    expect(response).toEqual([]);
  });
});
