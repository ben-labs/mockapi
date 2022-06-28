import { Router, json, Request, Response } from 'express';
import crypto from 'crypto';

const route = Router();

route.use(json());

const fwRules: IFwRule[] = []; // firewall rules. In Memory only.
const fwRulesInStore: string[] = [];// Keeps track of hashes of rules stored. This is to prevent duplicates
interface IFwRule{
    dst_ip: string,
    dst_port: string,
    src_ip: string,
    direction: string
};

/** Generates a number between 0-max */
const randomDelay = (max: number)=>{
    return Math.floor(Math.random() * max);
};

/** List all firewall rules */
route.get('/', (req: Request, res: Response)=>{    
    res.json(fwRules);
});

route.post('/', (req: Request, res: Response)=>{
    const { src_ip, dst_ip, dst_port, direction } = req.body as IFwRule;

    // TODO: Need to validate incoming values to ensure no injection attacks

    const incoming:IFwRule = {
        dst_ip: dst_ip,
        dst_port: dst_port,
        src_ip: src_ip,
        direction: direction
    };

    const newHash = crypto.createHash('md5').update(JSON.stringify(incoming)).digest('hex');
    if(fwRulesInStore.indexOf(newHash) > -1){
        return res.status(500).json({
            msg: 'Rule already implemented'
        });
    }else{
        fwRules.push(incoming);
        fwRulesInStore.push(newHash);
        setTimeout(()=>{
            res.status(201).json({
                msg: "FW Rule implemented"
            });
        }, randomDelay(5) * 1000); // randomNumber X 1000 = milliseconds        
    }
});

export default route;