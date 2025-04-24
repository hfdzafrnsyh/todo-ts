import prisma from "../prisma";
import { Category } from "../../generated/prisma";
import { CreateCategoryDTO } from "../validators/category.validator";


export class CategoryService {
        async create(data : CreateCategoryDTO) {
            const categories = await prisma.category.create({data})
            return categories;
        }

        async getCategoryById(id : number){
            const categories = await prisma.category.findUnique({
                where : {id : id}
            });

            if(!categories){
                throw new Error("Data not found");
            }

            return categories;
        }
}