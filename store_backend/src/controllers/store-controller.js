let {validationResult} = require('express-validator');
let fs = require('fs');

let HttpError = require('../models/httpErrors');
let Product = require('../models/product');
let upload = require('../middleware/fileUpload');

//fulfilling the  get request
const getItems = async (req,res,next)=>{
    let products;

    try{
        products = await Product.find().exec();
    }catch (e) {
        return next(new HttpError('something went wrong with the request', 500));
    }

    if(!products) {
        return next(new HttpError('could not get list of products', 500));
    }
    await res.json({products:products.map(product =>product.toObject({getters:true}))}).status(200);
};

//post request for creating new item
const createItem = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError(errors,422));
    }

    const {category,description,price,name} = req.body;

    const newItem = new Product({
        name,
        category,
        image: req.file.path,
        description,
        price,
        inCart: false,
        count:0,
        total:0
    });
    try{
        await newItem.save();
    }catch (e) {
        return next(new HttpError('creating item failed please try again later',500));
    }

    res.json({product : newItem.toObject({getters:true})}).status(201);
};

//patch request for updating an item
const updateItem = async (req,res,next)=>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        return next(new HttpError('bad data entered for editing',400))
    }

    const{description,price} = req.body;
    const foundId = req.params.pid;
    let foundItem;
    try{
        foundItem = await Product.findById(foundId);
    }catch (e) {
        return next(new HttpError('could get the product',500));
    }
    if(!foundItem){
        return next(new HttpError('could not find place for editing'),500);
    }

    foundItem.description = description;
    foundItem.price = price;
    try{
        await foundItem.save();
    }catch (e) {
        return next(new HttpError('could not edit product',500));
    }

    await res.status(200).json({foundItem: foundItem.toObject({getters:true})});
};

//deleting an item
const deleteItem = async (req,res,next) =>{
  const foundId = req.params.pid;
  let foundProduct;
  try{
      foundProduct = await Product.findById(foundId);
  }catch (e) {
      return next(new HttpError('something went wrong try later',500));
  }
  if(!foundProduct){
      return next(new HttpError('place doesnt exist',404));
  }
  const imagePath = foundProduct.image;

  try{
      await foundProduct.remove();
  }catch (e) {
      return next(new HttpError('could not delete the product please try later',500))
  }

  fs.unlink(imagePath,(err)=>{console.log(err)});

  await res.json({message:'successfully deleted'}).status(200);
};

exports.getItems = getItems;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
