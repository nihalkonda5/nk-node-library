import { AuthorRepository } from '../repositories';
import Request from '../helpers/request.helper';
import BaseService from './base.service';

class AuthorService extends BaseService {

    constructor(repository : AuthorRepository) { 
        super(repository);
    }

    isAuthor = async(request:Request, entityId:string) => {
        return await this.repository.isAuthor(entityId,request.getUserId());
    }

    checkIdExists = async(request:Request,id:string) => {
        try {
            const result = await this.repository.get(id);
            console.log('AuthorService','checkIdExists',result);
            return result;
        } catch (error) {
            console.log(error)
        }
        return false;
    }

    embedAuthorInformation = async(request:Request,arr:object[]=[],attributes:string[]=['author'],extractUserProfiles:Function) => {
        console.log('embedAuthorInformation',arr)
        if(arr.length === 0)
            return arr;

        const authors = {};

        arr.forEach((a)=>{
            attributes.forEach((at)=>{
                authors[a[at]] = {};
            })
        })

        const authorInfos = await extractUserProfiles(Object.keys(authors));

        authorInfos.forEach((authorInfo)=>{
            authorInfo = JSON.parse(JSON.stringify(authorInfo));
            authors[authorInfo['userId']] = authorInfo;
        })

        console.log('embedAuthorInformation',authors);

        for(let i=0;i<arr.length;i++){
            attributes.forEach((attribute)=>{
                arr[i] = JSON.parse(JSON.stringify(arr[i]));
                arr[i][attribute] = authors[arr[i][attribute]];
            })
        }

        console.log('embedAuthorInformation',arr);

        return arr;
    }
/*
    checkEntityId = async(request:Helpers.Request,type,entityId) => {
        console.log('checkEntityId',entityId)
        if(entityId){
            let responses = await Services.PubSub.Organizer.publishMessage({
                request,
                type,
                data:entityId
            })
            
            console.log('checkEntityId',responses);

            let success = false;

            for(const m of responses){
                if(m){
                    if(m.data){
                        success = true;
                    }
                }
            }

            if(!success)
                throw this.buildError(404);
        }else{
            console.log('entityId unavailable')
            throw this.buildError(400,'entityId unavailable');
        }
    }

    checkQueryId = async(request:Helpers.Request,queryId) => {
        console.log('checkQueryId',queryId)
        this.checkEntityId(request,PubSubMessageTypes.QUERY.CHECK.ID_EXISTS,queryId);
    }


    checkResponseId = async(request:Helpers.Request,responseId) => {
        console.log('checkResponseId',responseId)
        this.checkEntityId(request,PubSubMessageTypes.RESPONSE.CHECK.ID_EXISTS,responseId);
    }
*/
}

export default AuthorService;