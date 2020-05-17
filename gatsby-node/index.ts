
import { GatsbyNode } from 'gatsby';
import { FullPost, AllPosts } from '../src/querytypes/post';
import { resolve } from 'path';
import { getLinkForPost } from '../src/util/link';



export const createPages: GatsbyNode['createPages'] = async (args, opts, cb) => {
    const result = await args.graphql<AllPosts<FullPost>, any>(`
        {
            allMicrocmsPosts(sort: {fields: [createdAt], order: ASC}) {
                edges {
                    node {
                        id
                        createdAt
                        title
                        bibletext
                        content
                    }
                }
            }
        }
    `)
    if (result.errors) {
        args.reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    const posts: {node: FullPost}[] = result.data.allMicrocmsPosts.edges
    try {
        posts.forEach((p, idx) => {
            args.actions.createPage({
                path: getLinkForPost(p.node),
                component: resolve('./src/templates/post.tsx'), // origin is set in tricky path.
                context: {
                    post: p.node,
                    prevPost: idx > 0 ? posts[idx - 1].node : undefined,
                    nextPost: idx + 1 < posts.length ? posts[idx + 1].node : undefined
                }
            })
        })
    } catch(e) {
        args.reporter.panicOnBuild(`Error while creating page.`)
    }
    
}