import { AppDataSource } from "../database/database";
import { Book } from "../models/Book";

export class BookService {
  static async create({ title, author }: { title: string, author: string }) {
    try {
      const bookRepository = AppDataSource.getRepository(Book);
      const book = bookRepository.create({
        title,
        author,
      });
      await bookRepository.save(book);
      return book;
    } catch (error: any) {  // Especificando tipo `any` para capturar qualquer tipo de erro
      throw new Error(error.message);
    }
  }

  static async getAll() {
    try {
      const bookRepository = AppDataSource.getRepository(Book);
      return await bookRepository.find();
    } catch (error: any) {  // Especificando tipo `any` para capturar qualquer tipo de erro
      throw new Error(error.message);
    }
  }

  static async getOne(id: string) {
    try {
      const bookRepository = AppDataSource.getRepository(Book);
      const book = await bookRepository.findOneBy({ id: parseInt(id) });
      if (!book) throw new Error("Livro não encontrado.");
      return book;
    } catch (error: any) {  // Especificando tipo `any` para capturar qualquer tipo de erro
      throw new Error(error.message);
    }
  }

  static async update(id: string, { title, author }: { title?: string, author?: string }) {
    try {
      const bookRepository = AppDataSource.getRepository(Book);
      const book = await bookRepository.findOneBy({ id: parseInt(id) });
    
      if (!book) throw new Error("Livro não encontrado.");
    
      book.title = title || book.title;
      book.author = author || book.author;
    
      await bookRepository.save(book);
      return book;
    } catch (error: any) {  // Especificando tipo `any` para capturar qualquer tipo de erro
      throw new Error(error.message);
    }
  }

  static async delete(id: string) {
    try {
      const bookRepository = AppDataSource.getRepository(Book);
      const book = await bookRepository.findOneBy({ id: parseInt(id) });
    
      if (!book) throw new Error("Livro não encontrado.");
    
      await bookRepository.remove(book);
    } catch (error: any) {  // Especificando tipo `any` para capturar qualquer tipo de erro
      throw new Error(error.message);
    }
  }
}
