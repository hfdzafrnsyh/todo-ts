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

export const UpdateUserSchema = z.object({
    name : z.string().min(4).optional(),
    phone : z.string().min(10).optional(),
}).partial()


export interface CreateLoginUserDTO{
    email : string,
    password : string
};

export interface CreateUpdateUserDTO{
    name : string  | undefined,
    phone : string | undefined,
    photo : string | undefined
};

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;