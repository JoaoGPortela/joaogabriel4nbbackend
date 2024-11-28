import { dataSource } from "../database/database";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {
  static async register({ name, email, password }: { name: string, email: string, password: string }) {
    try {
      const userRepository = dataSource.getRepository(User);
    
      const existingUser = await userRepository.findOneBy({ email });
      if (existingUser) throw new Error("Usuário já existe.");
    
      const hashedPassword = await bcrypt.hash(password, 8);
    
      const user = userRepository.create({
        name,
        email,
        password: hashedPassword,
      });
    
      await userRepository.save(user);
      return user;
    } catch (error: any) {  // Especificando tipo `any` para capturar qualquer tipo de erro
      throw new Error(error.message);
    }
  }

  static async login({ email, password }: { email: string, password: string }) {
    try {
      const userRepository = dataSource.getRepository(User);
      const user = await userRepository.findOneBy({ email });

      if (!user) throw new Error("Usuário não encontrado.");
    
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error("Senha incorreta.");
    
      const token = jwt.sign({ id: user.id }, "secret_key", { expiresIn: "1h" });
      return token;
    } catch (error: any) {  // Especificando tipo `any` para capturar qualquer tipo de erro
      throw new Error(error.message);
    }
  }
}
