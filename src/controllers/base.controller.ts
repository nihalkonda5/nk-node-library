import * as express from 'express';

import Controler from './controller';
import Service from '../services/service';
import Request from '../helpers/request.helper';


class BaseController implements Controler{

    service: Service;

    constructor(service: Service = null){
        this.service = service;
    }

    create : any = async(req : express.Request , res : express.Response) => {
        try {
            const request : Request = res.locals.request;
            const body = req.body; 

            const createdDocument = await this.service.create(request, body);

            return res.send(createdDocument);
        } catch (error) {
            console.log(error);
            if(error.status && error.message){
                return res.status(error.status).json({errorCode:'SERVICE_ERROR',message:error.message});
            }
            return res.status(500).send('unknown server issue');
        }
    } 

    get : any = async(req : express.Request , res : express.Response) => {
        try {
            const request : Request = res.locals.request;
            const documentId:string = req.params.id; 
            const attributes:string[] = req.body.attributes;
            const document = await this.service.get(request, documentId, attributes);
            return res.send(document);
        } catch (error) {
            console.log(error);
            if(error.status && error.message){
                return res.status(error.status).json({errorCode:'SERVICE_ERROR',message:error.message});
            }
            return res.status(500).send('unknown server issue');
        }
    }

    getAll : any = async(req : express.Request , res : express.Response) => {
        try {
            const request : Request = res.locals.request;

            const pageSize :number = parseInt(req.query.pageSize+'') || 5
            const pageNum :number = parseInt(req.query.pageNum+'') || 1
            
            const query = req.body.query
            const sort = req.body.sort

            const attributes:string[] = req.body.attributes

            const result = await this.service.getAll(request, query, sort, pageSize, pageNum, attributes);

            return res.send(result);
        } catch (error) {
            console.log(error);
            if(error.status && error.message){
                return res.status(error.status).json({errorCode:'SERVICE_ERROR',message:error.message});
            }
            return res.status(500).send('unknown server issue');
        }
    }

    update : any = async(req : express.Request , res : express.Response) => {
        try {
            const request : Request = res.locals.request;
            const documentId:string = req.params.id; 
            const body = req.body; 

            const updatedDocument = await this.service.update(request, documentId, body);

            return res.send(updatedDocument);
        } catch (error) {
            console.log(error);
            if(error.status && error.message){
                return res.status(error.status).json({errorCode:'SERVICE_ERROR',message:error.message});
            }
            return res.status(500).send('unknown server issue');
        }
    }

    updatePartial : any = async(req : express.Request , res : express.Response) => {
        try {
            const request : Request = res.locals.request;
            const documentId:string = req.params.id; 
            const body = req.body; 

            const updatedDocument = await this.service.updatePartial(request, documentId, body);

            return res.send(updatedDocument);
        } catch (error) {
            console.log(error);
            if(error.status && error.message){
                return res.status(error.status).json({errorCode:'SERVICE_ERROR',message:error.message});
            }
            return res.status(500).send('unknown server issue');
        }
    }

    delete : any = async(req : express.Request , res : express.Response) => {
        try {
            const request : Request = res.locals.request;
            const documentId:string = req.params.id; 
            const deleteddocument = await this.service.delete(request, documentId);
            return res.send(deleteddocument);
        } catch (error) {
            console.log(error);
            if(error.status && error.message){
                return res.status(error.status).json({errorCode:'SERVICE_ERROR',message:error.message});
            }
            return res.status(500).send('unknown server issue');
        }
    }

    deleteAll : any = async(req : express.Request , res : express.Response) => {
        try {
            const request : Request = res.locals.request;
            const deletedDocuments = await this.service.deleteAll(request);
            return res.send(deletedDocuments);
        } catch (error) {
            console.log(error);
            if(error.status && error.message){
                return res.status(error.status).json({errorCode:'SERVICE_ERROR',message:error.message});
            }
            return res.status(500).send('unknown server issue');
        }
    }

}
export default BaseController;