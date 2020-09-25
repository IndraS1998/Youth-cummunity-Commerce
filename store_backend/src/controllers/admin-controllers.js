const {validationResult} = require('express-validator');
let bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/administator');
const HttpError = require('../models/httpErrors');

//fulfilling authentication request

const authenticate = async (req,res,next) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new HttpError('are you sure that you are an admin?',400))
    }
    const {email,password} = req.body;
    let foundAdmin;
    try{
        foundAdmin = await Admin.findOne({email})
    }catch (e) {
        return next(new HttpError('something went wrong please try again later',500))
    }
    if(!foundAdmin){
        return next(new HttpError('user does not exit',400));
    }
    let isValidPassword = false;
    try{
        isValidPassword = await bcrypt.compare(password,foundAdmin.password);
    }catch (e) {
        return next(new HttpError('something went wrong please try again later',500))
    }
    if(!isValidPassword){
        return next(new HttpError('password doesn\'t match',400));
    }

    let token;
    try{
        token = jwt.sign({id:foundAdmin.id,email:foundAdmin.email},
            'secretKeyDontShare',
            {expiresIn:'1h'});
    }catch (e) {
        return next(new HttpError('something went wrong please try again later',500))
    }

    res.status(200).json({Name : foundAdmin.name,token})

};

const create = async(req,res,next) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new HttpError('please enter valid data',400))
    }
    const {name,password,email} = req.body;
    let foundAdmin;

    try{
        foundAdmin = await Admin.findOne({email})
    }catch (e) {
        return next(new HttpError('something went wrong please try again later',500))
    }

    if(foundAdmin){
        return next(new HttpError('user already exists',401));
    }

    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password,12);
    }catch (e) {
        return next(new HttpError('something went wrong please try again later',500))
    }

    const newAdmin = new Admin({
        name,
        password: hashedPassword,
        email
    });
    try{
        await newAdmin.save()
    }catch (e) {
        return next(new HttpError('server error please try again later',500))
    }

    await res.json({message:'successfully created'}).status(200);
};

exports.authenticate = authenticate;
exports.create = create;
