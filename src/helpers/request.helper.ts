interface IRequest{
    id: string,
    user : {
        isConfirmed : boolean,
        isAuthenticated : boolean,
        email : string,
        id : string
    },
    header : {
        ip : string,
        token:{
            type:string,
            value:string,
            expiryTime:number,
            isExpired:boolean,
            secondsToExpiry:number
        }
    },
    raw : {
        body : object,
        query : object,
        params : object
    },
    location:{
        latitude : number,
        longitude : number,
        raw : object
    },
    hasToken : boolean
}

export default class Request implements IRequest {
    id: string;
    user: { email: string; id: string; isAuthenticated: boolean; isConfirmed: boolean};
    header: { ip: string; token: {type:string, value:string, expiryTime:number, isExpired:boolean, secondsToExpiry:number} };
    raw: {
        body : object,
        query : object,
        params : object
    };
    location : {
        latitude : number,
        longitude : number,
        raw : object
    };
    hasToken: boolean;
    
    constructor(){
        this.id = Date.now().toString();
        this.user = {
            isAuthenticated:false,
            isConfirmed:false,
            id:'',
            email:'',
        }
        this.header = {
            ip : '',
            token : {
                type:'',
                value:'',
                expiryTime:0, 
                isExpired: true,
                secondsToExpiry: 0
            }
        };
        this.location = {
            latitude:0.0,
            longitude:0.0,
            raw:{}
        };
        this.raw = {
            body : {},
            query : {},
            params : {}
        };
        this.hasToken = false;
    }

    getId(){
        return this.id;
    }

    setIP(ip:string){
        if(ip){
            this.header.ip = ip;
        }
        return this.header.ip;
    }

    getIP(){
        return this.header.ip;
    }

    setEmail(email:string){
        if(email){
            this.user.isAuthenticated = true;
            this.user.email = email;
        }
        return this.user.email;
    }

    getEmail(){
        return this.user.email;
    }

    setUserId(id:string){
        if(id){
            this.user.isAuthenticated = true;
            this.user.id = id;
        }
        return this.user.id
    }

    getUserId(){
        return this.user.id
    }
    
    setToken(tokenP:{type:string, value:string, expiryTime:number}){
        let token = {
            type:'',
            value:'',
            expiryTime:0, 
            isExpired: true,
            secondsToExpiry: 0
        };
        if(tokenP){
            this.hasToken = true;
            token.type = tokenP.type.toLowerCase();
            token.value = tokenP.value;
            token.expiryTime = tokenP.expiryTime;
            const seconds = (tokenP.expiryTime - Date.now())/1000;
            token.isExpired = seconds<=0;
            token.secondsToExpiry = seconds;
            this.header.token = token;
        }
        return this.header.token
    }
    
    getToken(){
        return this.header.token
    }
    getTokenValue(){
        return this.header.token.value
    }
    getTokenType(){
        return this.header.token.type
    }
    isTokenExpired(){
        return this.header.token.isExpired
    }
    isUserAuthenticated(){
        return this.user.isAuthenticated
    }
    isUserConfirmed(){
        return this.user.isConfirmed
    }

    setConfirmed(isConfirmed:boolean){
        this.user.isConfirmed = isConfirmed;
        return this.user.isConfirmed;
    }

    setLocation(location:{
        latitude : number,
        longitude : number,
        raw : object
    }){
        this.location = location;
    }

    getLocation(){
        return this.location;
    }

    setRaw(raw:{
        body : object,
        query : object,
        params : object
    }){
        this.raw = raw;
        return this.raw;
    }

    getRaw(){
        return this.raw;
    }

}