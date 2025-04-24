import prisma from "../prisma";
import { CreatePostDTO, CreateUpdatePostDTO } from "../validators/post.validator";

export class PostService {
    async create(data : CreatePostDTO){
            
    
        
        //cek array category
        if(Array.isArray(data.categoryId) && data.categoryId.length > 0){

            //cek data array category
            const category = await prisma.category.findMany(({
                where : { id : {
                    in : data.categoryId
                } }
            }))

            if (category.length !== data.categoryId.length) {
                throw new Error("Data not found");
            }
            
        }

        //create post 
        const post = await prisma.post.create({
            data :  {
                title : data.title,
                content : data.content,
                userId : data.userId
            }
        });

        //creat many-to-many postcategory
        await prisma.postCategory.createMany({
            data : data.categoryId.map((catId) => ({
                postId : post.id,
                categoryId : catId
            }))
        });


        //get post yang baru di create dengan include relasi
        const newPost = await prisma.post.findUnique({
            where : {id : post.id},
            include : {
                postCategories : {
                    include : {
                        category : true
                    }
                }
            }
        });

        return newPost;   
    }

    async detailPost(id : number){
        const post = await prisma.post.findUnique(({
            where : { id : id},
            include : { postCategories : {
                include : {
                    category : true
                }
            }}
        }))

        if(!post){
             throw new Error("Data not found");
        }

        return post;
    }

    async updatePost(id : number,data : CreateUpdatePostDTO) {

        const post = await prisma.post.findUnique(({
            where : { id : id},
        }))

        if(!post){
             throw new Error("Data not found");
        }

        
        if(Array.isArray(data.categoryId) && data.categoryId.length > 0){

            //cek data rray category
            const category = await prisma.category.findMany(({
                where : { id : {
                    in : data.categoryId
                } }
            }))

            if (category.length !== data.categoryId.length) {
                throw new Error("Data not found");
              }
            

           //jika di postcategory ada maka hapus semua
           await prisma.postCategory.deleteMany({
                 where : { postId : post.id }
            })

           // create ulang setelah di hapus
            await prisma.postCategory.createMany({
                data : data.categoryId.map((catId) => ({
                    postId : post.id,
                    categoryId : catId
                }))
            });

        }

            const updatePost = await prisma.post.update({
                where : {id : post.id},
                data : {
                    title : data.title,
                    content : data.content
                },
                include : {
                    postCategories : {
                        include : {
                            category : true
                        }
                    }
                }
            })
        

            return updatePost;

    }

    async delete(id : number){

        const post = await prisma.post.findUnique({
            where : { id : id }
        })

        if(!post){
            throw new Error("Data not found");
        }

        //jika ada maka cek dan hapus dulu di postcategory 

        await prisma.postCategory.deleteMany({
            where : { postId : post.id }
        });

        //hapus post 
      return  await prisma.post.delete({
            where : {id : post.id }
        });

    }
}