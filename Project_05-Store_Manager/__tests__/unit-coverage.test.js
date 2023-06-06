const { executeTests, readCoverageFile, assertCoveragePercentage, clearNycCoverage } = require('./nyc-coverage');


describe('Testes das camadas Model, Service e Controller', () => {
  let coverageResults;
  let coverageResultsArr;

  beforeAll(async () => {
    await executeTests();
    coverageResults = await readCoverageFile();
    coverageResultsArr = Object.entries(coverageResults);
  })

  afterAll(async (done) => {
    await clearNycCoverage();
    done()
  });

  describe('02 - Desenvolva testes que cubram no mínimo 5% de linhas e tenha no mínimo 2 funções escritas nas camadas da sua aplicação', () => {
    it("Será validado que em cada uma das pastas `models`, `services` e `controllers`, a cobertura total das linhas dos arquivos é maior ou igual a 5% e o número de funções escritas é maior ou igual a 2", async () => {
      assertCoveragePercentage(coverageResultsArr, 5, 2);
    });
  });

  describe("05 - Desenvolva testes que cubram no mínimo 10% de linhas e tenha no mínimo 3 funções escritas nas camadas da sua aplicação", () => {
    it("Será validado que em cada uma das pastas `models`, `services` e `controllers`, a cobertura total das linhas dos arquivos é maior ou igual a 10% e o número de funções escritas é maior ou igual a 3", async () => {
      assertCoveragePercentage(coverageResultsArr, 10, 3);
    });
  });

  describe("07 - Desenvolva testes que cubram no mínimo 15% de linhas e tenha no mínimo 4 funções escritas nas camadas da sua aplicação", () => {
    it("Será validado que em cada uma das pastas `models`, `services` e `controllers`, a cobertura total das linhas dos arquivos é maior ou igual a 15% e o número de funções escritas é maior ou igual a 4", async () => {
      assertCoveragePercentage(coverageResultsArr, 15, 4);
    });
  });

  describe('09 - Desenvolva testes que cubram no mínimo 20% de linhas e tenha no mínimo 6 funções escritas nas camadas da sua aplicação', () => {
    it('Será validado que em cada uma das pastas `models`, `services` e `controllers`, a cobertura total das linhas dos arquivos é maior ou igual a 20% e o número de funções escritas é maior ou igual a 6', async () => {
      assertCoveragePercentage(coverageResultsArr, 20, 6);
    });
  });

  describe('11 - Desenvolva testes que cubram no mínimo 25% de linhas e tenha no mínimo 7 funções escritas nas camadas da sua aplicação', () => {

    it('Será validado que em cada uma das pastas `models`, `services` e `controllers`, a cobertura total das linhas dos arquivos é maior ou igual a 25% e o número de funções escritas é maior ou igual a 7', async () => {
      assertCoveragePercentage(coverageResultsArr, 25, 7);
    });
  });

  describe('14 - Desenvolva testes que cubram no mínimo 35% de linhas e tenha no mínimo 9 funções escritas nas camadas da sua aplicação', () => {
    it('Será validado que em cada uma das pastas `models`, `services` e `controllers`, a cobertura total das linhas dos arquivos é maior ou igual a 35% e o número de funções escritas é maior ou igual a 9', async () => {
      assertCoveragePercentage(coverageResultsArr, 35, 9);
    });
  });

  describe('16 - Desenvolva testes que cubram no mínimo 40% de linhas e tenha no mínimo 10 funções escritas nas camadas da sua aplicação', () => {
    it('Será validado que em cada uma das pastas `models`, `services` e `controllers`, a cobertura total das linhas dos arquivos é maior ou igual a 40% e o número de funções escritas é maior ou igual a 10', async () => {
      assertCoveragePercentage(coverageResultsArr, 40, 10);
    });
  });
})
