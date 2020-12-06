import * as express from 'express';
import Request from '../helpers/request.helper';
import {Service} from '../services'
import * as jwtHelper from '../helpers/jwt.helper';
const getIP = require('external-ip')();
const geoip = require('geoip-lite');

function extractToken(req:express.Request){
    try {
        console.log(req.headers['authorization'])
        const p = req.headers['authorization'].split(' ');
        if(p.length==2)
            return {
                type:p[0],//refresh or access
                value:p[1],//actual token(jwt) string
                expiryTime:0//expiration time is extracted from decoded payload
            }
    } catch (error) {
        console.log(error.message)
    }
    return null
}

async function extractIP(req:express.Request){
    try {
        console.log(req.headers)
        const xForwardedFor = ((req.headers['x-forwarded-for']+'') || '').replace(/:\d+$/, '');
        console.log('xForwardedFor',xForwardedFor,'req.connection.remoteAddress',req.connection.remoteAddress);
        let ip = xForwardedFor || req.connection.remoteAddress;
        console.log('ip',ip);
        console.log('getIP',getIP);
        ip = await new Promise((resolve,reject)=>{
            getIP((err, _ip) => {
                console.log('err',err,'ip',_ip);
                if (err) {
                    // every service in the list has failed
                    reject(err);
                    return;
                }
                resolve(_ip);
            });
        });
        console.log('ip','updated',ip);
        return ip;
    } catch (error) {
        console.log(error)
    }
    return null
}

function requestProcessor (service : Service = null){
    return async function ( req : express.Request , res : express.Response , next : express.NextFunction ){
        console.log('middleware','requestProcessor','begin');
        try {
            const request : Request = new Request();
            console.log('middleware','requestProcessor',request);

            request.setIP(await extractIP(req));
            request.setRaw({
                body:JSON.parse(JSON.stringify(req.body)),
                query:JSON.parse(JSON.stringify(req.query)),
                params:JSON.parse(JSON.stringify(req.params))
            });
            const token = extractToken(req);
            request.setToken(token);

            try {
                
                const geo = geoip.lookup(request.getIP());

                request.setLocation({
                    latitude:geo.ll[0],
                    longitude:geo.ll[1],
                    raw:geo
                })
                
            } catch (error) {
                
            }

            console.log('middleware','requestProcessor',request);
        
            if(request.hasToken){
                const decoded :jwtHelper.Auth = await jwtHelper.decodeToken(request.getToken());
        
                if(decoded){
    
                    let activeTokenCount = 1;
    
                    try {
                        if(service){
                            if(request.getTokenType()==='refresh'){
                                activeTokenCount = await service.getActiveRefreshTokenCount(request);
                            }
                        }
                    } catch (error) {
                        console.log('middleware','requestProcessor',error);
                        activeTokenCount=0;
                    }
    
                    console.log('requestProcessor','activeTokenCount',activeTokenCount,decoded);

                    if(activeTokenCount >= 1){
                        request.setUserId(decoded.id);
                        request.setEmail(decoded.email);
                        token.expiryTime = decoded.expiryTime;
                        request.setToken(token);
                        request.setConfirmed(decoded.isConfirmed);
                    }
    
                }
            }

            console.log('middleware','requestProcessor','almost done',request);
        
            res.locals={request}
            next()
        } catch (error) {
            console.log('middleware','requestProcessor',error)
            res.send(500).send('unknown issue');
        }
    }
}

function addParamToRequest(){
    return (req:express.Request, res:express.Response, next:express.NextFunction, value:any, name:string)=>{
        const request : Request = res.locals.request;
        //console.log('\n\n\nrouter.param\n\n\n',name,value,'\n\n\n');
        request.raw.params[name]=value;
        next();
    }
}

export {requestProcessor,addParamToRequest};