import { PostService } from "../services/PostService";
import { Request , Response , NextFunction } from "express";
import { CreatePostSchema, CreateUpdatePostSchema } from "../validators/post.validator";
import { getHttpStatus } from "../helper/httpStatus";
import { CategoryService } from "../services/CategoryService";
import { error } from "console";

const postService = new PostService();

export class PostController {
    create = async (req : Request , res : Response , next : NextFunction) => {
        try{

            const parsed = CreatePostSchema.safeParse(req.body);

            if(!parsed.success){
                return res.status(400).json({error : parsed.error.errors});
            }

            const userId = (req as any).user?.userId;

            const { title , content , categoryId } = parsed.data;

            
            const post = await postService.create({title , content , userId, categoryId});
            
            return res.status(201).json({
                success : true,
                data : post
            });


        }catch(error : any){
            const status = getHttpStatus(error);

            return res.status(status).json({
                success : false,
                error : error.message || "Internal server error"
            });
        }
    }

    detail = async (req : Request , res : Response , next : NextFunction) => {
        try{

            const postId = parseInt(req.params.id);    
    
            const post = await postService.detailPost(postId);
            
            return res.status(200).json({
                success : true,
                data : post
            });


        }catch(error : any){
            const status = getHttpStatus(error);

            return res.status(status).json({
                success : false,
                error : error.message || "Internal server error"
            });
        }
    }


    updatePost = async (req : Request , res : Response , next : NextFunction) => {
        try{

            const parsed = CreateUpdatePostSchema.safeParse(req.body);

            if(!parsed.success){
                return res.status(400).json({error : parsed.error.errors});
            }

            const postId = parseInt(req.params.id);    

            const {title, content , categoryId} = parsed.data;

            const post = await postService.updatePost(postId , {title , content , categoryId});
                
            return res.status(200).json({
                success : true,
                data : post
            });


        }catch(error : any){
            const status = getHttpStatus(error);

            return res.status(status).json({
                success : false,
                error : error.message || "Internal server error"
            });
        }
    }

    delete = async (req:Request , res:Response , next : NextFunction) => {
        try{

            const postId = parseInt(req.params.id);

            await postService.delete(postId);

            return res.status(200).json({
                success : true,
                message :  "Remove Successfully"
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