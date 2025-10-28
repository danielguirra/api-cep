import axios from 'axios';
import { Router, type Request, type Response } from 'express';
import { cache } from '../cache.js';

const cep = Router();

cep.post('/:id', async (req: Request, res: Response) => {
   const cep = req.params.id;
   const regex = /^\d{5}-?\d{3}$/;
   if (!cep) return res.status(404).json();
   try {
      if (!regex.test(cep)) throw new Error('Cep inválido');

      const key = `cep:${cep}`;
      const cached = cache.get(key);

      if (cached) {
         console.log(`Cache|${key}|`);
         res.setHeader('X-Cache', 'HIT');
         return res.status(200).json({ ...cached, cached: true });
      }

      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (data.erro) throw new Error('Erro na requisição verifique o CEP');

      cache.set(key, data);

      res.setHeader('X-Cache', 'MISS');
      return res.status(200).json({ ...data, cached: false });
   } catch (error: unknown) {
      let message = 'Erro desconhecido';
      if (error instanceof Error) {
         message = error.message;
      }

      return res.status(400).json({
         status: 400,
         message,
         cep,
      });
   }
});

export default cep;
