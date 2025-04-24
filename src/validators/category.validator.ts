import {  z } from "zod";

export const CreateCategorySchema = z.object({
    name : z.string().min(4)
});

export type CreateCategoryDTO = z.infer<typeof CreateCategorySchema>
