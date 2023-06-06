const frisby = require("frisby");
const { runSeed, connect, itTrybe: it } = require('./_utils');
const { rightProductBody, productCreateResponse } = require('./_dataMock');


describe("03 - Crie endpoint para cadastrar produtos", () => {
  const url = `http://${process.env.HOST}:${process.env.PORT}`;

  beforeAll(async () => await runSeed());

  it("Será validado que é possível cadastrar um produto com sucesso", async () => {
    const { status, json } = await frisby.post(`${url}/products`, rightProductBody);

    expect(status).toBe(201);
    expect(json).toEqual(productCreateResponse);
  });
});
