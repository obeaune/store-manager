const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/productModel');
const ProductsService = require('../../../services/productService');

describe('Testes relacionados a camada de Service de Produtos =>', () => {

  describe('A consulta ao BD retorna um array com todos os produtos', async() => {
    before(() => {
      const execute = [
        {
          "id": 1,
          "name": "produto A",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "produto B",
          "quantity": 20
        }
      ];  
      sinon.stub(ProductsModel, 'getAll').resolves(execute);
    });
    after(() => {
      ProductsModel.getAll.restore();
    });
    
    it('Verifica se o retorno do BD é um array', async () => {
      const response = await ProductsService.getAll();
      expect(response).to.be.a('array');
    });
    it('Se esse retorno é um array de objetos', async () => {
      const response = await ProductsService.getAll();
      expect(response.length).to.be.equal(2);
    });
  })

  describe('Ao criar um novo produto tudo ocorreu bem', async() => {
    const name = 'Quebra Cabeça Temático - Twin Peaks';
    const quantity = 26;
    before(() => {
      const execute = [];
      const idExample = 4;
      sinon.stub(ProductsModel, 'getAll').resolves(execute)
      sinon.stub(ProductsModel, 'createProduct').resolves({ id: idExample });
    });
    after(() => {
      ProductsModel.getAll.restore();
      ProductsModel.createProduct.restore();
    });
    it('Verifica se o retorno do BD é um obj', async () => {
      const response = await ProductsService.createProduct(name, quantity);
      expect(response).to.be.a('object');
      expect(response).to.have.keys('id');
    });
  })

});
