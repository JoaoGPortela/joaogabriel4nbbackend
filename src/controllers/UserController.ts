import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  // Registrar um novo usuário
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.register({ name, email, password });
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Fazer login de um usuário
  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const token = await UserService.login({ email, password });
      return res.json({ token });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
