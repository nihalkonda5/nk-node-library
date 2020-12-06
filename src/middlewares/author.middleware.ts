import { AuthorService } from "../services";
import * as express from 'express';
import { Request } from "../helpers";

function isAuthor(service : AuthorService) {
    return async(req:express.Request, res:express.Response, next:express.NextFunction) => {
        const request : Request = res.locals.request;
        const isAuthor = await service.isAuthor(request,req.params.id);
        console.log('isAuthor',isAuthor);
        if(isAuthor){
            next();
        }else{
            res.status(403).json({errorCode:'ONLY_AUTHOR_ACCESS',message:'Only Author is allowed to perform this operation'});
        }
    }
}

export default isAuthor;