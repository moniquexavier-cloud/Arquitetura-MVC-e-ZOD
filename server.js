import express from 'express';
import consultaRoutes from './src/routes/consultaRoutes.js';

const app = express();

app.use(express.json());
app.use('/consultas', consultaRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});