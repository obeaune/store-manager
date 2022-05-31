const express = require('express');

const app = express();

const product = require('./controllers/productController');
const sale = require('./controllers/saleController');

app.use(express.json());

app.get('/products', product.getAll);

app.get('/products/:id', product.getById);

app.get('/sales', sale.getAll);

app.get('/sales/:id', sale.getById);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
