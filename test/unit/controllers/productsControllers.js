const sinon = require('sinon');
const { expect } = require('chai');

const ProductsService = require('../../../services/productService');
const ProductsController = require('../../../controllers/productController');

describe('Testes referentes a camada de CONTROLLER de PRODUTOS =>', () => {

  describe('Requisição getAll() quando ainda não existem produtos no BD', async () => {
    const res = {};
    const req = { params: {} };
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(ProductsService, "getAll").resolves([]);
    });
    after(() => {
      ProductsService.getAll.restore();
    });
    it('Verifica se é chamado o método "status" passando o código 200', async () => {
      await ProductsController.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    })
    it('Verifica se é chamado o método "json" passando o código 200', async () => {
      await ProductsController.getAll(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  });

  describe('Requisição getById()', async () => {
    const res = {};
    const req = { params: { id: 1} };
    before(() => {
      const execute = [{
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
      }]
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(ProductsService, "getById").resolves(execute);
    });
    after(() => {
      ProductsService.getById.restore();
    });
    it('Verifica se é chamado o método "status" passando o código 200', async () => {
      await ProductsController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    })
    it('Verifica se é chamado o método "json" passando o código 200', async () => {
      await ProductsController.getById(req, res);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  });

  describe('Requisição para criar um novo produto', async () => {
    const res = {};
    const req = { body: {} };
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(ProductsService, "createProduct").resolves({});
    });
    after(() => {
      ProductsService.createProduct.restore();
    });
    it('Verifica se é chamado o método "status" passando o código 201', async () => {
      await ProductsController.create(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    })
  });
});
