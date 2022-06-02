const express = require('express');
const rescue = require('express-rescue');

const app = express();

const product = require('./controllers/productController');
const sale = require('./controllers/saleController');
const ErrorHandler = require('./middlewares/ErrorHandler');

app.use(express.json());

app.get('/products', rescue(product.getAll));

app.get('/products/:id', rescue(product.getById));

app.post('/products', rescue(product.create));

app.put('/products/:id', rescue(product.update));

app.get('/sales', rescue(sale.getAll));

app.get('/sales/:id', rescue(sale.getById));

app.post('/sales', rescue(sale.create));

app.put('/sales/:id', rescue(sale.update));

app.use(ErrorHandler);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
