import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//ROUTES
//route for save a new book
router.post('/', async (req, res) => {
  try {
    if (
      !req.body.titulo ||
      !req.body.autor ||
      !req.body.anoDePublicacao
    ) {
      return res.status(400).send({
        message: 'Preencha todos os campos: titulo, autor, e ano de publicação...'
      });
    }
    const newBook = {
      titulo: req.body.titulo,
      autor: req.body.autor,
      anoDePublicacao: req.body.anoDePublicacao,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//get one book
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//route for update
router.put('/:id', async (req, res) => {
  try {
    if (
      !req.body.titulo ||
      !req.body.autor ||
      !req.body.anoDePublicacao
    ) {
      return res.status(400).send({
        message: 'Preencha todos os campos: titulo, autor, e ano de publicação...'
      });
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
  const { id } = req.params;
  const resultado = await Book.findByIdAndUpdate(id, req.body);
  if (!resultado) {
    return res.status(404).json({ message: 'Livro não encontrado' });
  }
  return res.status(200).send({ message: 'Livro actualizado com sucesso!' });
});
//delete route book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Book.findByIdAndDelete(id);

    if (!resultado) {
      return res.status(404).json({ message: 'Livro não encontrado!' });
    }
    return res.status(200).send({ message: 'Livro eliminado com sucesso!' });

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
