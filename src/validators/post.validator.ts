import { z } from "zod";


export const CreatePostSchema = z.object({
    title  : z.string().min(6),
    content : z.string().min(30),
    categoryId : z.array(z.preprocess((a) => Number(a), z.number()))
});

export const CreateUpdatePostSchema = z.object({
    title  : z.string().min(6).optional(),
    content : z.string().min(30).optional(),
    categoryId : z.array(z.preprocess((a) => Number(a), z.number())).optional()
}).partial();



export interface CreatePostDTO {
    title : string,
    content : string,
    userId : number,
    categoryId : number[]
}

export interface CreateUpdatePostDTO {
    title : string | undefined,
    content : string | undefined,
    categoryId : number[] | undefined
}

