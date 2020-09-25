const jwt = require('jsonwebtoken');

const httpError = require('../models/httpErrors');

module.exports = (req,res,next) =>{
    if(req.method === 'OPTIONS'){
        return next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];//authorisation 'bearer TOKEN'
        if(!token){
            return next(new httpError('Authentication failed',401));
        }
        let digestToken = jwt.verify(token, 'secretKeyDontShare');
        req.userData = {id:digestToken.id,email:digestToken.email};
        next();
    }catch (e) {
        return next(new httpError('Authentication failed',401));
    }

};
