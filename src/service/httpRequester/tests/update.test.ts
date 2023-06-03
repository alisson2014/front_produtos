import { httpRequester } from "..";

describe("HTTP METHOD UPDATE", () => {
  test("Deve trazer status true da api", async () => {
    const mockData = {
      id: 250,
      nome: "teste jest update",
    };
    const response = await httpRequester({
      method: "UPDATE",
      file: "categories",
      data: mockData,
    });
    expect(response.status).toBeTruthy();
  });

  test("Deve trazer status false da api", async () => {
    const response = await httpRequester({
      method: "UPDATE",
      file: "categories",
      data: {},
    });
    expect(response?.status).toBeFalsy();
  });

  test("Deve retornar um array vazio em caso de erro", async () => {
    const mockData = {
      id: 237,
      nome: "teste erro",
    };
    const response = await httpRequester({
      method: "UPDATE",
      file: "ret",
      data: mockData,
    });
    expect(response).toEqual([]);
  });
});
