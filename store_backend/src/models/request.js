let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    cost:{type:Number, required:true},
    email:{type:String, required:true},
    numberOfProducts: {type:Number, required:true},
    location:{type:String, required:true},
    phoneNumber: {type:Number, required:true},
    items:{type: Array, required:true},
    completed:{type: Boolean,required:true}
});

module.exports = mongoose.model('Request',requestSchema);
