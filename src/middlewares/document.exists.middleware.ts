import * as express from 'express';
import { Request } from '../helpers';
import { BaseService } from '../services';

function checkDocumentExists(service : BaseService,paramName:string='id') {
    return async(req:express.Request, res:express.Response, next:express.NextFunction) => {
        const request : Request = res.locals.request;
        try {
            if(await service.documentExists(request,req.params[paramName])){
                next();
                return;
            }
        } catch (error) {
            
        }
        res.status(404).json({errorCode:'NOT_FOUND',message:paramName+' not found'});
    }
}

export default checkDocumentExists;