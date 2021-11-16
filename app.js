require("dotenv").config();

const express =  require('express');
const app = express();
const path = require('path');
const morgan =  require('morgan');
const connectToDatabase = require("./mongodb");
const rotaPontos = require('./src/routes/pontos');

//ACCESS TO FOLDERS PUBLIC
app.use('/public',express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));

//LIMIT SIZE FILE
app.use(express.urlencoded({ limit: '50mb', extended: false}));
app.use(express.json({limit: '50mb'}));

//connect database mongodb
connectToDatabase();

//ROUTES
app.use('/pontos', rotaPontos);

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

//BAD REQUEST
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
  });
});

module.exports = app;

//mCev1xmRUzzNrSgn
