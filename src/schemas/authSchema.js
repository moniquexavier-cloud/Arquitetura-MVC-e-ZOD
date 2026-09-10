// Definindo as regras de validação do zod
import { z } from 'zod';

// Criando Scheme para registro de usuário
export const registerSchema = z.object({

  email: z
    .string()
    .min(1, { message: "O e-mail é obrigatório." })
    .trim()
    .lowercase()
    .email({ message: "E-mail inválido" }),

  password: z
  .string().min(6,{message: 'A senha deve ter pelo menos 6 caracteres'}),

  role: z
  .enum(['PACIENTE', 'MEDICO', 'ADMIN'])
});

// Criando Scheme para login de usuário já cadastrado
export const loginSchema = z.object({
    
  email: z
    .string()
    .min(1,{ message: "O e-mail é obrigatório." })
    .trim()
    .lowercase()
    .email({ message: "E-mail inválido" }),

  password: z
  .string()
  .min(1, {message:"A senha é obrigatória"})
});
