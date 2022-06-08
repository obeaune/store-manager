const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../models/saleModel');
const SalesService = require('../../../services/saleService');

describe('Testes referentes a camada de Service de Sales', () => {
  describe('A consulta ao BD retorna um array com todas as vendas', async() => {
    before(() => {
      const execute =   [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]; 
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

  describe('Ao criar uma nova venda tudo ocorreu bem', async() => {
    const bla = [
      {
        "productId": 1,
        "quantity": 3
      }
    ];
    before(() => {
      const execute = [];
      const example =   {
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 3
          }
        ]
      };
      sinon.stub(SalesModel, 'getAll').resolves(execute)
      sinon.stub(SalesModel, 'createSale').resolves({ example });
    });
    after(() => {
      SalesModel.getAll.restore();
      SalesModel.createSale.restore();
    });
    it('Verifica se o retorno do BD é um obj', async () => {
      const response = await SalesService.createSale(bla);
      console.log(response);
      expect(response).to.be.a('object');
      // expect(response).to.have.keys('id');
    });
  })

});

