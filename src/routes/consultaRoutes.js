import { Router } from 'express';
import { listAll, create, getById } from '../controllers/consultaController.js';
import { createConsultaSchema, consultaIdParamSchema } from '../schemas/consulta.Schema.js';

const router = Router();

// Rota para listar todas as consultas
router.get('/', listAll);


// Rota POST com middleware de validação Zod
router.post('/', async (req, res, next) => {
  try {
    req.body = await createConsultaSchema.parseAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      message: 'Dados inválidos',
      erros: error.issues
    });
  }
}, create);

// Rota GET /:id com middleware de validação Zod
router.get('/:id', async (req, res, next) => {
  try {
    await consultaIdParamSchema.parseAsync(req.params);
    next();
  } catch (error) {
    return res.status(400).json({
      message: 'ID inválido',
      erros: error.issues
    });
  }
}, getById);

export default router;