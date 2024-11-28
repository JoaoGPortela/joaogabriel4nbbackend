import express from "express";
import { AppDataSource } from "./database/database";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  })
  .catch((error) => console.log("Erro ao conectar ao banco:", error));
