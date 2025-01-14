import {Elysia, t} from "elysia";
import { getPosts,createPost, getPostById } from "../controllers/PostController";

const Routes = new Elysia({prefix: '/posts'})

    // get all data
    .get('/', () => getPosts())
    // route create data post
    .post('/', ({body}) => createPost(body as { title: string; content: string }), {
        body: t.Object({
            title: t.String({
                minLength: 3,
                maxLength: 100,
            }),
            content: t.String({
                minLength: 3,
                maxLength: 1000,
            }),
        })
    })
    // get data by id
    .get('/:id', ({params: { id }}) => getPostById(id))

export default Routes;