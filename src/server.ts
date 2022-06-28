import express, { Response, Request } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import fwRoute from './routes/firewall';
import config from './config';

const api = express();

api.use(helmet());
api.use(morgan('common'));
api.use(cors());
api.use('/api/firewall', fwRoute);

const PORT:number =  config.port | 5000;
api.listen(PORT, ()=>{console.log(`API Server listening on ${PORT}`)});