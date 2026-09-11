import express from 'express';
//importando dotnev
import 'dotenv/config';
import consultaRoutes from './src/routes/consultaRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes)
app.use('/consultas', consultaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

