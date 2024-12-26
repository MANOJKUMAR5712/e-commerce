import mongoose from "mongoose";
import {Product,validateData} from "../models/products.model.js";

export const getAllProducts = async (req,res)=>{
    try {
        const products = await Product.find({});
        return res.status(200).json({success : true , data : products})
    } catch (error) {
        res.status(500).json({success : false , message : 'Server Error'})
    }
} ;

export const createProduct = async (req,res)=>{
    const product  = req.body;

    const validationResult = validateData(product);

    if(typeof validationResult=='string') return res.status(400).json({success : false , message : validationResult}) ;
    
    const newProduct  = new Product(product);
    try{
        await newProduct.save();
        return res.status(200).json({success : true , data : newProduct})
    }catch(error){
        console.error(`Error : ${error.message}`)
        return res.status(500).json({success : false , message : 'Server Error'}) // 500 - internal server error
    }
} ; 

export const updateProduct = async (req,res)=>{
    const {id} = req.params ;
    const product = req.body ;
    
    // const validationResult = validateData(product);

    // if(typeof validationResult=='string') return res.status(400).json({success : false , message : validationResult}) ;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false , message : "Product id Invalid"})
    } ;

    try {
        const updatedProduct  = await Product.findByIdAndUpdate(id,product,{new : true})
        return res.status(200).json({success : true , data : updatedProduct});
    } catch (error) {
        return res.status(500).json({success :false , message : 'Server Error'})
    }
} ;

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success : false , message : "Product id Invalid"})
    }

    try{
        await Product.findByIdAndDelete(id);
        return res.status(200).json({success : true , message : "product deleted"});
    }catch(error){
        return res.status(500).json({success : false , message : "Server Error"});
    }
} ; 