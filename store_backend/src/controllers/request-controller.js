let {validationResult} = require('express-validator');

let HttpError = require('../models/httpErrors');
let Request = require('../models/request');

//fulfilling a get request for all requests

const getRequests = async (req,res,next) =>{
    let requests;
    try{
        requests = await Request.find().exec();
    }catch (e) {
        return next(new HttpError('something went wronf try again later try again later',500));
    }
    if(!requests){
        return next(new HttpError('could not get the requests from server try again later',500));
    }
    await res.json({requests: requests.map(request => request.toObject({getters:true}))}).status(200);
};

//fulfilling the post request for performing a purchase
const purchaseItems = async (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return next(new HttpError('wrong data entered',400));
    }

    const {cost,email,numberOfProducts,location,phoneNumber,items} = req.body;
    const newRequest = new Request({
        cost,
        email,
        numberOfProducts,
        location,
        phoneNumber,
        items,
        completed: false
    });
    try{
        await newRequest.save();
    }catch (e){
        return next(new HttpError('could not place request please try again later',500))
    }

    await res.json({purchase : {cost,email,phoneNumber},
        message: 'we will get to you through email or phone shortly' }).status(200);
};
//fulfilling the patch request for updating the completed field

//patch request for editing a request
const editRequest = async (req,res,next) =>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        return next(new HttpError('bad data entered for editing',400))
    }

    const foundId = req.params.reqId;

    let foundRequest;
    try{
        foundRequest = await Request.findById(foundId);
    }catch (e) {
        return next(new HttpError('something went wrong please ty again later'),500);
    }

    if(!foundRequest){
        return next(new HttpError('could not find the request',500));
    }

    foundRequest.completed = !foundRequest.completed;
    try{
        await foundRequest.save();
    }catch (e) {
        return next(new HttpError('could not edit request',500));
    }

    await res.json({message:'successfully edited', state:foundRequest.completed}).status(200);
};

//fulfilling delete request
const deleteRequest = async (req,res,next) =>{
    const foundId = req.params.pid;
    let fReq;

    try{
        fReq = await Request.findById(foundId);
    }catch (e) {
        return next(new HttpError('something went wrong please try again later',500));
    }

    if(!fReq){
        return next(new HttpError('could not find the place',500));
    }

    try{
        await fReq.remove();
    }catch (e) {
        return next(new HttpError('something went wrong with deleting please try again later',500));
    }

    await res.status(200).json({message: 'successfully deleted the request'});
};


exports.purchaseItems = purchaseItems;
exports.getRequests = getRequests;
exports.deleteRequest = deleteRequest;
exports.editRequest = editRequest;
