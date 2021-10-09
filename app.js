require("dotenv").config();

const express =  require('express');
const app = express();
const morgan =  require('morgan');

const connectToDatabase = require("./mongodb");
const rotaProdutos = require('./routes/produtos');
const rotaPontos = require('./routes/pontos');

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//connect database mongodb
connectToDatabase()




//CORS
app.use((req, res, next) =>{
  res.header('Acces-Control-Allow-Origin', '*')
  res.header(
    'Acces-Control-Allow-Header',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'

  );
  if(req.method === 'OPTIONS') {
    res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).send({})
  }
  next();
});
app.use(express.json());
app.use('/produtos', rotaProdutos);
app.use('/pontos', rotaPontos);

// Quando não encontra rota, entra aqui:
app.use((req, res, next) => {
  const erro = new Error('Não encontrado');
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      message: error.message
    }
  })
})

module.exports = app;

//04WWTO5LTDbB0V4P
//mCev1xmRUzzNrSgn
