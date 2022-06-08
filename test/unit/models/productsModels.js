const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/productModel');

describe('Testes relacionados a camada Model de Produtos =>', () => {
  describe('Insere um novo produto no BD', () => {
    const payloadProduct = {
      name: 'produto A',
      quantity: 10,
    }
  
    before(async () => {
      const execute = [{ insertId: 1 }]; // retorno esperado nesse teste
      sinon.stub(connection, 'execute').resolves(execute);
    });
    
    after(async () => {
      connection.execute.restore();
    });
  
    it('O retorno da criação de um novo produto é um objeto', async () => {
      const response = await ProductsModel.createProduct(payloadProduct);
      expect(response).to.be.a('object')
    });
    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await ProductsModel.createProduct(payloadProduct);
      expect(response).to.have.a.property('id')
    });
  });
  
  describe('Visualização dos produtos existentes no BD', () => {
    before(async () => {
      const execute = [
        [{
          id: 1,
          name: "Spore Doll",
          quantity: 10
        },
        {
          id: 2,
          name: "Raccoon Hat",
          quantity: 20
        },
        {
          id: 3,
          name: "Succubus Horns",
          quantity: 30
        }],
      ]; // retorno esperado nesse teste
      sinon.stub(connection, 'execute').resolves(execute);
    })
  
    after(() => {
      connection.execute.restore();
    })
  
    it('Verifica se o retorno do BD é um array', async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.be.an('array');
    });
  
    it('Verifica se o array não está vazio', async () => {
      const response = await ProductsModel.getAll();
      expect(response).to.not.be.empty;
    });
  
    it('Verifica se o array contém 3 objetos', async () => {
      const response = await ProductsModel.getAll();
      expect(response.length).to.equal(3)
    });
  
    it('Verifica se o retorno de uma requisição ao BD com ID específico é um objeto', async () => {
      const response = await ProductsModel.getById(1);
      expect(response).to.be.an('object');
    });
  });
  
  describe('Atualização de um produto no BD', () => {
    const id = 1;
    const name = "Poring Doll";
    const quantity = 15;
  
    before(async () => {
      const execute = {
          id: 1,
          name: 'Poring Doll',
          quantity: 15
        }; // retorno esperado nesse teste
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(() => {
      connection.execute.restore();
    });
  
    it('Verifica se retorna o produto modificado', async () => {
      const response = await ProductsModel.updateProduct(id, name, quantity);
      expect(response).to.be.an('object');
    });
    it('Verifica se o retorno contém três chaves', async () => {
      const response = await ProductsModel.updateProduct(id, name, quantity);
      expect(response).to.have.keys('id', 'name', 'quantity')
    });
  });
  
  describe('Remoção de um produto no BD com ID específico', () => {
    before(() => {
      const execute = []; // retorno esperado nesse teste
      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(() => {
      connection.execute.restore();
    })
  
    it('Sucesso ao remover produto', async () => {
      const response = await ProductsModel.excludeProduct(1);
      expect(response).to.be.an('undefined')
    });
  });
});
