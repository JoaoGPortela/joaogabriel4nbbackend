import { Request, Response } from 'express';
import authService from '../services/AuthServices';

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const token = await authService.authenticate(username, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: 'erro de login' });  // Retornando a mensagem do erro real
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await authService.register(username, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'erro de cadastro' });  // Retornando a mensagem do erro real
    }
  }
}

export default new AuthController();
