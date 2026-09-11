import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { registerSchema, loginSchema } from '../schemas/authSchema.js';

const router = Router();

router.post('/register', async (req, res, next) => { 
    try{
        req.body = await registerSchema.parseAsync(req.body);
            next();
          } catch (error) {
            return res.status(400).json({
              message: 'Dados inválidos',
              erros: error.issues
            });
          }
        }, authController.register);

router.post('/login', async (req,res,next) => {
    try{
        req.body = await loginSchema.parseAsync(req.body);
        next();
    } catch (error) {
      return res.status(400).json({
        message: 'Dados inválidos',
        erros: error.issues
      })
    }
    }, authController.login);

export default router;