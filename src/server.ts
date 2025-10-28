import * as dotenv from 'dotenv';
import express from 'express';

import { auth } from './auth.js';
import cep from './routes/cep.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(auth);

app.use('/cep', cep);

app.listen(PORT, () => console.log(`Rodando na ${PORT}`));
