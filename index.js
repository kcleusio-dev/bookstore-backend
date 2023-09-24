import mongoose from "mongoose";
import express from "express";
import booksRoute from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();
app.set('port', process.env.PORT || 7000);

//localhost:27017 mongodb://localhost:27017
mongoose.connect('mongodb://127.0.0.1:27017/projectMER')
  .then(() => console.log('conectado ao MongoDB'))
  .catch(err => console.error('Impossivel conectar ao Mongodb...', err));

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
//option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:7000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   }),
  
// );

app.use('/books', booksRoute);

//welcome route
app.get('/', (req, res) => {
  return res.status(234).send('Bem vindo a Bookstore');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:'
    + app.get('port') + '; press CRTL-C to terminate.')
});
