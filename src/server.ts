import express, { Response, Request } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import https, { ServerOptions} from 'https';
import fs from 'fs';

import fwRoute from './routes/firewall';
import config from './config';

const api = express();

const serveOptions: ServerOptions = {
    key: fs.readFileSync('./var/certs/mock.key'),
    cert: fs.readFileSync('./var/certs/mock.pem')
};


api.use(helmet());
api.use(morgan('common'));
api.use(cors());
api.use('/api/firewall', fwRoute);

const PORT:number =  config.port | 5000;
api.listen(PORT, ()=>{console.log(`API Server listening on ${PORT}`)});
https.createServer(serveOptions, api).listen(443);