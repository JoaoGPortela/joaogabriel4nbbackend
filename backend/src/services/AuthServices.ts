import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';

class AuthServices {
  private userRepository = new UserRepository();

  async register(username: string, password: string): Promise<User> {
    console.log("Iniciando registro...");  // Log de depuração
    
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('Nome de usuário já existe.');
    }

    // Log para ver o usuário
    console.log("Criando novo usuário...");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userRepository.create({
      username,
      password: hashedPassword,
    });

    console.log("Usuário criado:", newUser);  // Log de depuração
    
    return newUser;
  }

  async authenticate(username: string, password: string): Promise<string> {
    console.log("Iniciando autenticação...");

    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha inválida.');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'defaultsecret', {
      expiresIn: '1h',
    });

    console.log("Token gerado:", token);  // Log de depuração

    return token;
  }
}

export default new AuthServices();

