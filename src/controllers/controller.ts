import * as express from 'express';
import Service from '../services/service';

export default interface Controller{
    service? : Service;
    get?(req : express.Request , res : express.Response),
    getAll?(req : express.Request , res : express.Response),
    create?(req : express.Request , res : express.Response) ,
    update?(req : express.Request , res : express.Response) ,
    updatePartial?(req : express.Request , res : express.Response) ,
    delete?(req : express.Request , res : express.Response) 
}