import { httpRequester } from "..";

describe("HTTP METHOD DELETE", () => {
  test("Deve trazer status true da api", async () => {
    const response = await httpRequester({
      method: "DELETE",
      file: "categories",
      id: 205,
    });
    expect(response.status).toBeTruthy();
  });

  // test("Deve trazer status false da api", async () => {
  //   const response = await httpRequester({
  //     method: "DELETE",
  //     file: "categories",
  //     id: 1500,
  //   });
  //   expect(response.status).toBeFalsy();
  // });

  test("Deve retornar um array vazio em caso de erro", async () => {
    const response = await httpRequester({
      method: "DELETE",
      file: "errorFile",
      id: 1,
    });
    expect(response).toEqual([]);
  });
});
