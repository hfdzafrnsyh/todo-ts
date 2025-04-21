import {z} from "zod";

export const CreateUserSchema = z.object({
    name : z.string().min(4),
    email : z.string().email(),
    password : z.string().min(6),
})


export const LoginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6),
})


export type CreateUserDTO = z.infer<typeof CreateUserSchema>;