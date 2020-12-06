import Service from './service';
import Repository from '../repositories/repository';
import Request from '../helpers/request.helper';

import * as PubSub from './pubsub.service';

class BaseService implements Service,PubSub.NLSubscriber{
    repository : Repository;

    constructor(repository : Repository = null){
        this.repository = repository;
    }
    
    processMessage(message: PubSub.NLMessage) : any{
        console.log(message);
    }

    buildError(errorCode = 500,errorMessage = "Unknown Server Error."){
        const error = {};
        error['status'] = errorCode;
        error['message'] = errorMessage;
        return error;
    }

    documentExists = async(request:Request, documentId:string) => {
        if(!documentId){
            throw this.buildError(400,"documentId is required.");
        }
        return await this.repository.documentExists(documentId);
    }

    get = async(request:Request, documentId:string, attributes=[]) => {
        if(!documentId){
            throw this.buildError(400,"documentId is required.");
        }
        const currentdocument = await this.repository.get(documentId,attributes);

        if(!currentdocument) {
            throw this.buildError(404,"Requested document not found.");
        }
        return currentdocument;
    }

    getAll = async(request:Request, query = {}, sort = {}, pageSize:number = 5, pageNum:number = 1, attributes:string[]=[]) => {
        return await this.repository.getAll(query, sort, pageSize, pageNum,attributes);
    }

    create = async(request:Request, document:any) => {
        return await this.repository.create(document);
    }

    update = async(request:Request, documentId:string, document:any) => {
        if(!documentId){
            throw this.buildError(400,"documentId is required.");
        }

        return await this.repository.update(documentId, document);
    }

    updatePartial = async(request:Request, documentId:string, partial:any) => {
        if(!documentId){
            throw this.buildError(400,"documentId is required.");
        }

        return await this.repository.updatePartial(documentId, partial);
    }

    delete = async(request:Request, documentId:string) => {
        if(!documentId){
            throw this.buildError(400,"documentId is required.");
        }

        return await this.repository.delete(documentId);
    }

    deleteAll = async(request:Request) => {
        return await this.repository.deleteAll();
    }
}
export default BaseService;