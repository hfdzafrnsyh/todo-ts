import { NextFunction, Request , Response } from "express";
import { PostCategoryService } from "../services/PostCategoryService";
import { getHttpStatus } from "../helper/httpStatus";


const postCategoryService = new PostCategoryService();

export class PostCategoryController{

    getAll = async (req : Request , res : Response , next : NextFunction) => {
        
        try{
            const postCategory = await postCategoryService.getAll();

            return res.status(200).json({
                success : true,
                data : postCategory
            })
        }catch(error : any){
            const status = getHttpStatus(error);

            return res.status(status).json({
                success : false,
                error : error.message || "Internal server error"
            });
        }

    }


}