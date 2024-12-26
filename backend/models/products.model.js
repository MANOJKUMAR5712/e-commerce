import mongoose from "mongoose";

import Joi from "joi";


const productSchema = new mongoose.Schema({
    name : {type : String , required : true},
    price : {type : Number , required : true},
    image : {type : String , required : true}
}, {
    timestamps : true
})

const Product = mongoose.model('Product',productSchema);

const validateData = (productDetails)=>{
    const schema = Joi.object({
        name : Joi.string().required(),
        price : Joi.number().min(1).required(),
        image : Joi.string().required()
    })

    const {error,value} = schema.validate(productDetails);
    if(error){
        console.error(`Validation Error : ${error.details[0].message}`);
        return error.details[0].message ; 
    }

    return value ;
} ;

export {Product,validateData} ;