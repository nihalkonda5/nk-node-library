const axios = require('axios');

interface FormattedRequest{
    host? : string,
    path? : string,
    url? : string,
    method? : string,
    headers? : any,
    token? : {
        type:string,
        value:string
    },
    params? : {
        [key : string] : string|number
    },
    query? : {
        [key : string] : string|number
    },
    data? : any
}

async function apiRequest(packet : any) : Promise<{status:number,data:any}>{
    try {
        console.log(packet);

        return new Promise<{status:number,data:any}>(function(resolve,reject){
            axios(packet)
            .then((response)=>{
                //console.log('apiRequest response',response);
                const {status,data} = response
                resolve({status,data});
            })
            .catch((error)=>{
                //console.log('apiRequest error',error.response);
                const {status,data} = error.response
                resolve({status,data});
            })
        });

    } catch (error) {
        return {
            status:error.response.status || 500,
            data:{
                raw:JSON.parse(JSON.stringify(error)),
                message:error.response.message||'unknown server issue'
            }
        }
    }
}

async function formattedApiRequest(packet : FormattedRequest) : Promise<{status:number,data:any}>{
    //packet.host = packet.host || config.HOST
    packet.path = packet.path || ''
    packet.headers = packet.headers || {}
    packet.url = packet.host+packet.path
    packet.method = packet.method || 'get' 
    if(packet.token){
        packet.headers["authorization"] = packet.token.type+" "+packet.token.value
    }
    if(packet.params){
        for(const k of Object.keys(packet.params)){
            packet.url = packet.url.replace(':'+k,packet.params[k]+'');
        }
        delete packet.params
    }
    if(packet.query){
        const q = []

        for(const k of Object.keys(packet.query)){
            q.push(k+'='+packet.query[k])
        }

        packet.url+='?'+q.join('&')
        delete packet.query
    }
    return await apiRequest(packet)
}

export {
    apiRequest,
    formattedApiRequest
};