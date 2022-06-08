const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/productModel');
const ProductsService = require('../../../services/productService');

describe('Testes referentes a camada de SERVICE de PRODUTOS =>', () => {

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

  describe('A consulta ao BD, por id, retorna um array', async() => {
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
      sinon.stub(ProductsModel, 'getById').resolves(execute);
    });
    after(() => {
      ProductsModel.getById.restore();
    });
    it('Verifica se o retorno do BD é um array', async () => {
      const response = await ProductsService.getById();
      expect(response).to.be.a('array');
    });
  })

  describe('Ao adicionar um novo produto ao BD, tudo ocorre corretamente', async() => {
    const name = 'Quebra Cabeça';
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

  describe('Ao adicionar um produto que já existe no BD, ocorre um erro', async() => {
    const name = 'Quebra Cabeça';
    const quantity = 26;
    before(() => {
      const execute = [{name: 'Quebra Cabeça'}];
      const idExample = 4;
      sinon.stub(ProductsModel, 'getAll').resolves(execute)
      sinon.stub(ProductsModel, 'createProduct').resolves({ id: idExample });
    });
    after(() => {
      ProductsModel.getAll.restore();
      ProductsModel.createProduct.restore();
    });
    it('Verifica se o retorno é undefined por já existir o produto no BD', async () => {
      const response = await ProductsService.createProduct(name, quantity);
      expect(response).to.be.a('undefined');
    });
  })

  describe('Ao atualizar um produto no BD, tudo ocorre corretamente', () => {
    const id = 14;
    const name = 'Quebra Cabeça';
    const quantity = 26;
    before(() => {
      const execute = [{ id }];
      const idExample = 15;
      sinon.stub(ProductsModel, 'getAll').resolves(execute)
      sinon.stub(ProductsModel, 'updateProduct').resolves({ id: idExample });
    });
    after(() => {
      ProductsModel.getAll.restore();
      ProductsModel.updateProduct.restore();
    });
    it('Quando o produto existir, é atualizado', async () => {
      const response = await ProductsService.updateProduct(id, name, quantity);
      expect(response).to.be.a('object');
      expect(response).to.have.keys('id')
    });
  });

  describe('Ao tentar atualizar um produto que não existe no BD', () => {
    const name = 'Quebra Cabeça';
    const quantity = 26;
    before(() => {
      const execute = [{name: 'Quebra Cabeça'}];
      const idExample = 14;
      sinon.stub(ProductsModel, 'getAll').resolves(execute)
      sinon.stub(ProductsModel, 'updateProduct').resolves({ id: idExample });
    });
    after(() => {
      ProductsModel.getAll.restore();
      ProductsModel.updateProduct.restore();
    });
    it('Nada é retornado', async () => {
      const response = await ProductsService.updateProduct(name, quantity);
      expect(response).to.be.a('undefined');
    });
  });

  describe('Removendo um produto por id no BD', () => {
    const id = 1;
    before(() => {
      sinon.stub(ProductsModel, 'getAll').resolves([{ id }])
      sinon.stub(ProductsModel, 'excludeProduct').resolves([]);
    });
    after(() => {
      ProductsModel.getAll.restore();
      ProductsModel.excludeProduct.restore();
    });
    it('Nada é retornado', async () => {
      const response = await ProductsService.excludeProduct(id);
      expect(response).to.be.an('array'); // empty
    });
  });

  describe('Quando se tenta remover um produto que não existe no BD', () => {
    before(() => {
      sinon.stub(ProductsModel, 'getAll').resolves([])
      sinon.stub(ProductsModel, 'excludeProduct').resolves([]);
    });
    after(() => {
      ProductsModel.getAll.restore();
      ProductsModel.excludeProduct.restore();
    });
    it('Retorna uma mensagem de que o Id em questão não foi encontrado', async () => {
      const response = await ProductsService.excludeProduct(40);
      expect(response).to.be.a.string('ProductNotFound');
    });
  });

});
