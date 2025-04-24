import prisma from "../prisma";
import { Todo } from "../../generated/prisma";
import { CreateTodoDTO, UpdateTodoDTO } from "../validators/todo.validator";



export class TodoService{
    async findAll(){
        const todo  = await prisma.todo.findMany({});
        return todo;
    }

    async create(data : CreateTodoDTO){
        const todo : Todo = await prisma.todo.create({data})
        return todo;
    }

    async detail( id : number){

        const todo  = await prisma.todo.findUnique({
            where : {id : id},
            include: {
                user: {
                    select: {
                      id: true,
                      name: true,
                      email: true
                    }
                  }
             }
        });

        if(!todo){
            throw new Error("Data not found");
        }

        return todo;

    }

    async delete( id : number){

        const todo  = await prisma.todo.findUnique({
            where : {id : id},
        });

        if(!todo){
            throw new Error("Data not found");
        }

        return await prisma.todo.delete({
                where : { id : id}
            })


    }


    async update( id : number, data : UpdateTodoDTO){

        const todo  = await prisma.todo.findUnique({
            where : {id : id},
        });

        if(!todo){
            throw new Error("Data not found");
        }

        const updateTodo = await prisma.todo.update({
            where : {id},
            data: {title : data.title}
        })

        return updateTodo;
    }
}
