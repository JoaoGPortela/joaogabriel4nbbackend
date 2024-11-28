import express from "express";
import { dataSource } from "./database/database"; // Importa a configuração do DataSource
import { UserController } from "./controllers/UserController";
import { BookController } from "./controllers/bookController";

const app = express();
const port = 3000;

app.use(express.json());

// Tenta conectar ao banco de dados
dataSource.initialize()
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

// Definindo as rotas para o UserController
app.post("/register", UserController.register);
app.post("/login", UserController.login);

// Definindo as rotas para o BookController
app.post("/books", BookController.create);
app.get("/books", BookController.getAll);
app.get("/books/:id", BookController.getOne);
app.put("/books/:id", BookController.update);
app.delete("/books/:id", BookController.delete);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
