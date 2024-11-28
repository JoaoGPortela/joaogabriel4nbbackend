import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Usando a URL de conexão do banco de dados do .env
const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,  // Usa a URL configurada no .env
  synchronize: true,  // Sincroniza automaticamente as entidades com o banco de dados
  logging: false,
  entities: [
    // Suas entidades aqui
    require("./entities/User").User,
    require("./entities/Book").Book,
  ],
});

export { dataSource };