import prisma from "../prisma";

export class PostCategoryService {

    async getAll(){
        
        const postcategory = await prisma.postCategory.findMany({});
        return postcategory;
    }

}