import prisma from "../../prisma/client";

/**
 * getting all data
 */
export async function getPosts(){
    try {
        // get all posts
        const posts = await prisma.post.findMany({orderBy: { id: 'desc' }});

        // return response
        return {
            success: true,
            message: 'List Data Posts!',
            data: posts,
        };
    }catch (e: unknown) {
        console.error(`Error getting posts: ${e}`);
    }
}

/**
 * Creating a post
 */

export async function createPost(options: {title: string, content: string}) {
    try{

        // get title and content
        const {title, content} = options;

        // create data post
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
            }
        });

        // return response
        return {
            success: true,
            message: "Post Created Successfully!",
            data: post,
        }
    }catch(e: unknown) {
        console.error(`Error creating post: ${e}`);
    }
}
    /**
     * get post by id
     */
export async function getPostById(id: string) {
    try{
        // konversi id to int
        const postId = parseInt(id);

        // get post by id
        const post = await prisma.post.findUnique({
            where: {id: postId}
        });

        // if post not found
        if (!post) {
            return {
                success: true,
                message: "Detail Data Post Not Found!",
                data: null,
            }
        }

        // return response
        return {
            success: true,
            message: `Detail Data Post: ${postId}`,
            data: post
        }

    }catch(e: unknown) {
        console.error(`Error finding post: ${e}`);
    }
}

/**
 *  update as post
 */

export async function updatePost(id: string, options: {title?: string; content?: string}) {
    try {
        // konversi data id ke int
        const postId = parseInt(id);

        // ambil data title dan content
        const { title, content } = options;

        // update data
        const post = await prisma.post.update({
            where: {id : postId},
            data: {
                ... (title ? { title } : {}),
                ... (content ? { content } : {})
            }
        });

        return {
            success: true,
            message: "Post update successfully!",
            data: post,
        }
        
    } catch (e: unknown) {
        console.error(`Error update post: ${id}`);
    }   
}

/**
 * delete post
 */
export async function deletePost(id: string) {
    try {

        // Konversi tipe id menjadi number
        const postId = parseInt(id);

        //delete post with prisma
        await prisma.post.delete({
            where: { id: postId },
        });

        //return response json
        return {
            success: true,
            message: "Post Deleted Successfully!",
        }
    } catch (e: unknown) {
        console.error(`Error deleting post: ${e}`);
    }
}