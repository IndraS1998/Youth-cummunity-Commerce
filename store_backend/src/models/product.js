let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{type:String, required:true},
    category:{type:String, required:true},
    image:{type:String,required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    inCart:{type:Boolean,required:true},
    count:{type:Number,required:true},
    total:{type:Number,required:true}
});

module.exports = mongoose.model('Product',productSchema);
