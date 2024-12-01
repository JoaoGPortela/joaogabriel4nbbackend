"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rotas
app.use('/auth', AuthRoutes_1.default);
// Inicializar o servidor
const PORT = process.env.PORT || 3000;
database_1.default.sync({ force: false }) // Altere para true durante o desenvolvimento inicial
    .then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
})
    .catch((err) => console.error('Erro ao sincronizar o banco:', err));
