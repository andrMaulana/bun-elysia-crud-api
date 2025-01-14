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