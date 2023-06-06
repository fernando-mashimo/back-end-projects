const { runSeed, connect, itTrybe: it } = require('./_utils');
const frisby = require("frisby");

describe("13 - Crie endpoint para deletar uma venda", () => {
  const url = `http://${process.env.HOST}:${process.env.PORT}`;

  beforeAll(async () => await runSeed());

  it("Será validado que não é possível deletar uma venda que não existe", async () => {
    const { status, json } = await frisby.delete(`${url}/sales/999`);

    expect(status).toBe(404);
    expect(json.message).toEqual("Sale not found");
  });

  it("Será validado que é possível deletar uma venda com sucesso", async () => {
    const { status } = await frisby.delete(`${url}/sales/1`);

    expect(status).toBe(204);
  });

  it("Será validado que a venda foi removida do banco de dados", async () => {
    const { status, json } = await frisby.get(`${url}/sales/1`);

    expect(status).toBe(404);
    expect(Object.keys(json)).toContain("message");
    expect(json.message).toEqual("Sale not found");
  });
});
