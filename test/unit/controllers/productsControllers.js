const sinon = require('sinon');
const { expect } = require('chai');

const ProductsService = require('../../../services/productService');
const ProductsController = require('../../../controllers/productController');

describe('Testes na camada de Controller de Produtos =>', () => {
  describe('Requisição feita mas não existem produtos no BD', async () => {
    const response = {};
    const request = { params: {} };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsService, "getAll").resolves([]);
    });
    after(() => {
      ProductsService.getAll.restore();
    });

    it('Verifica se é chamado o método "status" passando o código 200', async () => {
      await ProductsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('Verifica se é chamado o método "json" passando o código 200', async () => {
      await ProductsController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })

    it('Verifica se é chamado o método "status" passando o código 200', async () => {
      const id = 1
      request.params = { id }
      await ProductsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
  });
});
