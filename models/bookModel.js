import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    autor: {
      type: String,
      required: true,
    },
    anoDePublicacao: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true
  }

);

export const Book = mongoose.model('Book', bookSchema);