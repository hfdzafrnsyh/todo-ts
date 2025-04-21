import bcrypt from "bcrypt";
import { CreateUserSchema, LoginSchema } from "../validators/user.validator";
import { NextFunction, Request,Response } from "express";
import { UserService } from "../services/UserService";
import jwt from "jsonwebtoken";
import { getHttpStatus } from "../helper/httpStatus";



const userService = new UserService();

export class UserController{
    create = async (req:Request ,res:Response) => {

        try{

            const parsed = CreateUserSchema.safeParse(req.body);

            if(!parsed.success){
                return res.status(400).json({error : parsed.error.errors});
            }

            const { name , email , password } = req.body;

            const hashPassword = await bcrypt.hash(password,10);

            const user = await userService.createUser({
                name ,
                email,
                password : hashPassword
            });

    
            return res.status(201).json({
                    "success" : true,
                    "data" : user
                });

        }catch(error : any){
          const status = getHttpStatus(error);

          return res.status(status).json({
            success: false,
            error: error.message || 'Internal Server Error',
          });
        }

    }

    userAll = async(req:Request , res:Response, next : NextFunction) => {
        
        try{
            const user = await userService.findAll();
            return res.status(200).json({
                "success" : true,
                "data" : user
            });
        }catch(error : any){
            return res.status(500).json({
                "success" : false,
                "error" : "Internal server error"
            });
        }

    }

    login = async(req :Request , res :Response) => {

       try{

            const parsed = LoginSchema.safeParse(req.body);

            if(!parsed.success){
                return res.status(400).json({error : parsed.error.errors});
            }
            
            const SECRET : string = process.env.SECRET!;
            
            const { email , password } = req.body;

           const user = await userService.login(email,password);

            const token = jwt.sign(
                {
               userId : user.id     
             },
                SECRET
             ,{
                'expiresIn' : '1d'
              });
           
            return res.status(200).json({
                 "success" : true,
                  "data" : user,
                  "token" : token
              });

       }catch (error: any) {
        
        const status = getHttpStatus(error);

        return res.status(status).json({
          success: false,
          error: error.message || 'Internal Server Error',
        });

      }

    }
}