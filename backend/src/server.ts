import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import authRoutes from './routes/AuthRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

app.use('/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Banco de dados sincronizado');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco:', err);
    process.exit(1);
  });
