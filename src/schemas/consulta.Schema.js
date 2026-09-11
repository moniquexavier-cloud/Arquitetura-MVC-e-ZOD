// Definindo as regras de validação do zod
import { z } from 'zod';

// biblioteca de validação
export const createConsultaSchema = z.object({

  id: z.number()//validação para numeros
  .int({message: "O ID deve ser um número inteiro"})
  .positive({message:"O número deve ser positivo"}),

  paciente: z.string()//validação para textos
  .min(3,{message:"O nome deve ter mais de 3 caracteres"}),

  medico: z.string()//validação para textos
  .min(3,{message:"O nome deve ter mais de 3 caracteres"}),

  especialidade: z.string()//validação para textos
  .min(3,{message:"A especialidade deve ter mais de 3 caracteres"})

});

export const consultaIdParamSchema = z.object({
id: z.string()
.transform((val)=> Number(val))
.refine((val) => !isNaN(val), { message: "O ID precisa ser um número válido" })
});


