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