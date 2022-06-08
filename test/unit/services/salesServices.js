const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../models/saleModel');
const SalesService = require('../../../services/saleService');

describe('Testes referentes a camada de SERVICE de SALES => ', () => {

  describe('A consulta ao BD retorna um array com todas as vendas', async() => {
    before(() => {
      const execute = [{ "saleId": 1 }, { "saleId": 1 }]; 
      sinon.stub(SalesModel, 'getAll').resolves(execute);
    });
    after(() => {
      SalesModel.getAll.restore();
    });
    it('Verifica se o retorno do BD é um array', async () => {
      const response = await SalesService.getAll();
      expect(response).to.be.a('array');
    });
    it('Se esse retorno é um array de objetos', async () => {
      const response = await SalesService.getAll();
      expect(response.length).to.be.equal(2);
    });
  });

  describe('A consulta ao BD, por id, retorna um array', async() => {
    before(() => {
      const execute = [{ "saleId": 1 }, { "saleId": 1 }]; 
      sinon.stub(SalesModel, 'getById').resolves(execute);
    });
    after(() => {
      SalesModel.getById.restore();
    });
    it('Verifica se o retorno do BD é um array', async () => {
      const response = await SalesService.getById();
      expect(response).to.be.a('array');
    });
  });
});

