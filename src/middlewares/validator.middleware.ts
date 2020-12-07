import * as express from 'express';
var Validator = require('jsonschema').Validator;

export default class ValidatorMiddleware {
  validator;
  constructor(schemas=[]){
    this.validator = new Validator();
    for (const schema of schemas) {
      this.validator.addSchema(schema,schema["id"]);
    }
  }
  addSchema(schema){
    this.validator.addSchema(schema,schema["id"]);
  }
  validateRequestBody(schema){
    return ( req : express.Request , res : express.Response , next : express.NextFunction ) => {
        console.log('validateRequestBody',schema);
        let validationResult;
        try {
            validationResult = this.validator.validate(req.body,schema);
            if(validationResult.errors.length === 0)
              next()
            else
              res.status(400).send(validationResult.errors)
        } catch (error) {
            return res.status(error.status||500).send(error.message||'Unknown Server Issue');
        }
    }
  }
}