const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const SalesModel = require('../../../models/saleModel');

describe('Testes referentes a camada MODEL de SALES =>', () => {

  describe('Visualização das vendas existentes no BD', () => {
    before(async () => {
      const execute = [
        [
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
        ],
      ]; // retorno esperado nesse teste
      sinon.stub(connection, 'execute').resolves(execute);
    })
  
    after(() => {
      connection.execute.restore();
    })
  
    it('Verifica se o retorno do BD é um array', async () => {
      const response = await SalesModel.getAll();
      expect(response).to.be.an('array');
    });
  
    it('Verifica se o array não está vazio', async () => {
      const response = await SalesModel.getAll();
      expect(response).to.not.be.empty;
    });
  
    it('Verifica se as vendas possuem as chaves corretas', async () => {
      const response = await SalesModel.getAll();
      expect(response[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity')
    });
  
    it('Verifica se o retorno de uma requisição ao BD com ID específico é um array populado com as vendas que contém esse ID', async () => {
      const response = await SalesModel.getById(1);
      expect(response[0]).to.include.keys({ saleId: 1 })
    });
  });
  
  describe('Insere uma nova venda no BD', () => {
    const payloadSale = {
      productId: 1,
      quantity: 10,
    }
    before(async () => {
      const execute = [{
        productId: 1,
        quantity: 10,
       }]; // retorno esperado nesse teste
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });
  
    it('O retorno é um objeto contendo as informações da nova venda cadastrada', async () => {
      const response = await SalesModel.insertSaleProducts(1, payloadSale);
      expect(response).to.be.a('object')
      expect(response).to.include.all.keys('productId', 'quantity');
    });
    it('A criação de uma nova venda retorna um objeto', async () => {
      const response = await SalesModel.createSale();
      expect(response).to.be.a('object')
      expect(response).to.have.a.property('id')
    });
  });
  
  describe('Se a atualização das vendas está sendo feita', () => {
    const id = 1;
    const productId = 2;
    const quantity = 15;
  
    before(async () => {
      const execute = {
        productId: 2,
        quantity: 15,
      }; // retorno esperado nesse teste
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });
  
    it('A atualização de venda retorna um objeto com as chaves productId e quantity', async () => {
      const response = await SalesModel.updateSale(id, [{ productId, quantity }]);
      expect(response).to.be.a('object')
      expect(response).to.include.all.keys('productId', 'quantity')
    });
  });
  
  describe('Remoção de uma venda no BD com ID específico', () => {
    before(() => {
      const execute = []; // retorno esperado nesse teste
      sinon.stub(connection, "execute").resolves(execute);
    });
    after(() => {
      connection.execute.restore();
    })
  
    it('Sucesso ao remover venda', async () => {
      const response = await SalesModel.exclude(1);
      expect(response).to.be.an('undefined')
    });
  });
});
