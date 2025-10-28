import axios from 'axios';
import { Router, type Request, type Response } from 'express';
import { cache } from '../cache.js';

const cep = Router();

cep.post('/:id', async (req: Request, res: Response) => {
   const cep = req.params.id;
   const regex = /^\d{5}-?\d{3}$/;
   if (!cep) return res.status(404).json();
   if (!regex.test(cep)) throw new Error('cep');

   const key = `cep:${cep}`;
   const cached = cache.get(key);

   if (cached) {
      console.log(`Cache|${key}|`);
      res.setHeader('X-Cache', 'HIT');
      return res.status(200).json({ ...cached, cached: true });
   }

   try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      cache.set(key, data);

      res.setHeader('X-Cache', 'MISS');
      return res.status(200).json({ ...data, cached: false });
   } catch (error) {
      return res.status(400).json({
         status: 400,
         message: 'Erro na requisição verifique o CEP',
         cep,
      });
   }
});

export default cep;
