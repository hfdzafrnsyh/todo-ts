import { compare } from "bcrypt";
import prisma from "../prisma";
import { CreateLoginUserDTO, CreateUpdateUserDTO, CreateUserDTO } from "../validators/user.validator";
import { User } from "../../generated/prisma";


export class UserService{
    async createUser(data : CreateUserDTO){
        const hasUser = await prisma.user.findUnique({
            where : { email : data.email }
        });

        if(hasUser){
            throw new Error("User has registered")
        }

        const user : User = await prisma.user.create({data});
       
        const { password: _, ...newUser } = user;

        return newUser;
    
    }

    async findAll(){
       const users = await prisma.user.findMany({
            select : {
                id: true,
                name: true,
                email: true,
                phone : true,
                photo: true
            }
        });

        return users;
    }

    async login(data : CreateLoginUserDTO){
        const user = await prisma.user.findUnique({
            where : { email : data.email }
        });

        if(!user){
            throw new Error("Data not found")
        }

        const isValid = await compare(data.password,user.password);

        if(!isValid){
            throw new Error("Invalid email password");
        }

    
                // Jangan return password!
        const { password: _, ...userWithoutPassword } = user;


        return userWithoutPassword;
        
    }

    profile = async(id : number) => {

        const user = await prisma.user.findUnique({
            where : {id : id},
            select : {
                id : true,
                name: true,
                email : true,
                phone : true,
                photo : true,
                todos : true,
                post : true
            },
        });

        return user

    }

    updateProfile = async (id : number , data : CreateUpdateUserDTO) => {
            
     
        const updateUser = await prisma.user.update({
            where : {id : id},
            data : data,
            select : {
                id : true,
                name : true,
                email : true,
                phone : true,
                photo : true
            }
        });


        return updateUser
    }
}