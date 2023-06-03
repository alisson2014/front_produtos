import { httpRequester } from "..";

describe("HTTP METHOD POST", () => {
  test("Deve trazer status true da api", async () => {
    const mockData = {
      nome: "teste jest post",
    };
    const response = await httpRequester({
      method: "POST",
      file: "categories",
      data: mockData,
    });

    expect(response.status).toBeTruthy();
  });

  test("Deve trazer status false da api", async () => {
    const response = await httpRequester({
      method: "POST",
      file: "categories",
      data: {},
    });

    expect(response.status).toBeFalsy();
  });

  test("Deve retornar um array vazio em caso de erro", async () => {
    const mockData = {
      nome: "teste erro",
    };
    const response = await httpRequester({
      method: "POST",
      file: "errorFile",
      data: mockData,
    });
    expect(response).toEqual([]);
  });
});
