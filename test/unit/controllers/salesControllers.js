const sinon = require('sinon');
const { expect } = require('chai');

const SalesService = require('../../../services/saleService');
const SalesController = require('../../../controllers/saleController');

describe('Testes referentes a camada de CONTROLLER de SALES =>', () => {

  describe('Requisição feita mas não existem produtos no BD', async () => {
    const response = {};
    const request = { params: {} };
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(SalesService, "getAll").resolves([]);
    });
    after(() => {
      SalesService.getAll.restore();
    });

    it('Verifica se é chamado o método "status" passando o código 200', async () => {
      await SalesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
    it('Verifica se é chamado o método "json" passando o código 200', async () => {
      await SalesController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
    it('Verifica se é chamado o método "status" passando o código 200', async () => {
      const id = 1
      request.params = { id }
      await SalesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })
  });

  describe('quando é removido com sucesso', async () => {
    const response = {};
    const request = { params: { id: 1} };
  
    before(() => {
      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();
      sinon.stub(SalesService, "exclude").resolves();
    });
  
    after(() => {
      SalesService.exclude.restore();
    });
  
    it('Verifica se é chamado o status com o código 204', async () => {
      await SalesController.exclude(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });
});