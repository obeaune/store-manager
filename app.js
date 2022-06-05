const express = require('express');

const app = express();

const ErrorHandler = require('./middlewares/errorHandler');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

app.use(express.json());

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use(ErrorHandler);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
