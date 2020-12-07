import * as express from 'express';
import { Request } from '../helpers';
import { BaseService } from '../services';
import * as Constants from 'nk-constants';

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
        res.status(404).json({errorCode:Constants.API.CUSTOM_ERROR.NOT_FOUND,message:paramName+' not found'});
    }
}

export default checkDocumentExists;