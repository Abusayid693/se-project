import { Request, Response, NextFunction } from "express";
// import db from "../../db.config";

export const createUser = async (req:Request, res:Response, next:NextFunction)=>{
    const {username, email, password} = req.body;
    
    if(!username || !email || !password){
        
    }

    try {
        
    } catch (error) {
        
    }
}