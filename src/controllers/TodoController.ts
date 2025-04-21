import { Request,Response,NextFunction } from "express";
import { TodoService } from "../services/TodoService";
import { CreateTodoSchema } from "../validators/todo.validator";
import { getHttpStatus } from "../helper/httpStatus";

const todoService = new TodoService();

export class TodoController{
    getAllTodo = async (req : Request , res:Response , next : NextFunction) => {
        try{
            const todo = await todoService.findAll();
            return  res.status(200).json({
                "success" : true,
                "data" : todo
            });
        }catch(error : any){
            return  res.status(500).json({
                "success" : false,
                "error" : "Internal server error"
            });
        }
    }

    create = async (req : Request , res:Response , next : NextFunction) => {
        try{
            
              const parsed = CreateTodoSchema.safeParse(req.body);

                if(!parsed.success){
                    return res.status(400).json({error : parsed.error.errors})
                }

                const userId = (req as any).user?.userId

                if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
              }


             const { title } = req.body;

             const todo = await todoService.create({title,userId})
          
             return  res.status(201).json({
                "success" : true,
                "data" : todo
            });

        }catch(error : any){
            return res.status(500).json({
                "success" : false,
                "error" : "Internal server error"
            });
        }
    }


    detail = async(req:Request , res : Response,next : NextFunction) => {
        try{

            const todoId : number = parseInt(req.params.id);
            const todo = await todoService.detail(todoId);

            return  res.status(200).json({
                "success" : true,
                "data" : todo
            });

        }catch(error : any){

            const status = getHttpStatus(error);

            return res.status(status).json({
            success: false,
            error: error.message || 'Internal Server Error',
            });
        }
    }

    delete = async(req:Request , res : Response,next : NextFunction) => {
        try{

            const todoId : number = parseInt(req.params.id);
            

            await todoService.delete(todoId);

            return  res.status(200).json({
                "success" : true,
                "message" : "Remove successuffly" 
            });

        }catch(error : any){

            const status = getHttpStatus(error);
            
            return res.status(status).json({
            success: false,
            error: error.message || 'Internal Server Error',
            });
        }
    }

    update = async(req:Request , res : Response,next : NextFunction) => {
        try{

            const parsed = CreateTodoSchema.safeParse(req.body);

            if(!parsed.success){
                return res.status(400).json({error : parsed.error.errors})
            }

            const todoId : number = parseInt(req.params.id);

            const {title} = req.body;

            const todo = await todoService.update(todoId,title);

            return  res.status(200).json({
                "success" : true,
                "data" : todo 
            });

        }catch(error : any){

            const status = getHttpStatus(error);
            
            return res.status(status).json({
            success: false,
            error: error.message || 'Internal Server Error',
            });
        }
    }
}