import { Request , Response , NextFunction } from "express";
import { CategoryService } from "../services/CategoryService";
import { CreateCategorySchema } from "../validators/category.validator";
import { getHttpStatus } from "../helper/httpStatus";

const categoryService = new CategoryService();

export class CategoryController{
    create = async (req : Request , res : Response , next : NextFunction) => {
        try{
            const parsed = CreateCategorySchema.safeParse(req.body);

            if(!parsed.success){
                return res.status(400).json({error : parsed.error.errors});
            }

            const { name } = parsed.data;

            const categories = await categoryService.create({name});
           
            return res.status(201).json({
                success : true,
                data : categories
            });

        }catch(error : any){
            const status = getHttpStatus(error);

            return res.status(status).json({
                success : false,
                error : error.message || "Internal server error"
            });
        }
    }
}