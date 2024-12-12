const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true,
    },
    quentity:{
        type:String,
        required:true,
        default:0
    },
    title:{
        type:String,
        required:true
    },
    size:{
        type:String,
        requird:true
    },
    price:{
        type:String,
        required:true
    },
    sku:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    }
})

module.exports = cartSchema