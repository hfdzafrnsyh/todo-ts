import {z} from "zod";

export const CreateTodoSchema = z.object({
    title : z.string().min(4),
});

export interface CreateTodoDTO {
    title: string;
    userId: number;
  };

export interface UpdateTodoDTO {
    title : string
};