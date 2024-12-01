import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import authRoutes from './routes/AuthRoutes';

dotenv.config();

const app = express();
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) // Altere para true durante o desenvolvimento inicial
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error('Erro ao sincronizar o banco:', err));
