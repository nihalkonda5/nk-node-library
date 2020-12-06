import * as mongoose from 'mongoose';
import Respository from './repository';

class BaseRepository implements Respository{
    model : mongoose.Model<any,{}>;
    
    constructor(model: mongoose.Model<any,{}> = null){
        this.model = model;
    }

    documentExists = async(documentId:string) => {
        console.log('base.repository ',documentId)
        return await this.model.exists({_id:documentId});
    } 

    get = async(documentId:string ,attributes = []) => {
        console.log('base.repository ',documentId)
        return await this.model.findById(documentId).select(attributes);
    }

    getOne = async(query:object ,attributes = []) => {
        console.log('base.repository ',query)
        return await this.model.findOne(query).select(attributes);
    }

    getAll = async(query = {}, sort = {}, pageSize : number = 5, pageNum : number = 1, attributes:string[]=[]) => {
        //skip - limit
        console.log('base.repository',query,sort,attributes,pageSize,pageNum);

        const resultTotalSize = await this.model.count(query);
        
        if(pageSize===-5497)
            pageSize = resultTotalSize;

        const skips = pageSize * (pageNum - 1)
        console.log(query,pageSize,pageNum)

        let result = [];
        if(resultTotalSize > 0){
            const attr = {};
            for (const a of attributes) {
                attr[a] = 1;
            }
            result = await this.model.find(query).sort(sort).skip(skips).limit(pageSize).select(attr);
        }
        const resultSize = result.length
        console.log(result)
        return {
            query,
            sort,
            attributes,
            pageSize,
            pageNum,
            resultSize,
            resultTotalSize,
            result
        }
    }

    create = async(document:any) => {
        return await this.model.create(document);
    }

    update = async(documentId:string , document) => {
        return await this.model.findByIdAndUpdate(documentId, document, {new: true});
    }

    updatePartial = async(documentId:string , partial:any) => {
        return await this.model.findByIdAndUpdate(documentId, {$set:partial}, {new: true});
    }

    updateOnePartial = async(query:object , partial:any) => {
        return await this.model.findOneAndUpdate(query, {$set:partial}, {new: true});
    }

    delete = async(documentId:string) => {
        return await this.model.findByIdAndDelete(documentId);
    }

    deleteOne = async(query:object) => {
        return await this.model.findOneAndDelete(query);
    }

    deleteAll = async() => {
        return await this.model.deleteMany({});
    }
}

export default BaseRepository;