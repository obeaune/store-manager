const express = require('express');

const app = express();

const store = require('./controllers/storeController');

app.use(express.json());

app.get('/products', store.getAllProducts);

app.get('/products/:id', store.getProductById);

app.get('/sales', store.getAllSales);

app.get('/sales/:id', store.getSaleById);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
