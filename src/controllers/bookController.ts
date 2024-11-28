import { Request, Response } from "express";
import { BookService } from "../services/bookService";

export class BookController {
  static async create(req: Request, res: Response) {
    try {
      const { title, author } = req.body;
      const book = await BookService.create({ title, author });
      return res.status(201).json(book);
    } catch (error: any) {  // Especificando tipo `any` para capturar qualquer tipo de erro
      return res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const books = await BookService.getAll();
      return res.json(books);
    } catch (error: any) {  // Especificando tipo `any` para capturar qualquer tipo de erro
      return res.status(400).json({ error: error.message });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const book = await BookService.getOne(id);
      return res.json(book);
    } catch (error: any) {  // Especificando tipo `any` para capturar qualquer tipo de erro
      return res.status(400).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, author } = req.body;
      const updatedBook = await BookService.update(id, { title, author });
      return res.json(updatedBook);
    } catch (error: any) {  // Especificando tipo `any` para capturar qualquer tipo de erro
      return res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await BookService.delete(id);
      return res.status(204).send();
    } catch (error: any) {  // Especificando tipo `any` para capturar qualquer tipo de erro
      return res.status(400).json({ error: error.message });
    }
  }
}
