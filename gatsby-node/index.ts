
import { GatsbyNode } from 'gatsby';
import { FullPost, AllPosts } from '../src/querytypes/post';
import { resolve } from 'path';
import { getLinkForPost } from '../src/util/link';
import unified from 'unified'
import markdown_in from 'remark-parse'
import slug from 'remark-slug'          
import remark2rehype from 'remark-rehype'
import html_out from 'rehype-stringify'

export const createPages: GatsbyNode['createPages'] = async (args, opts, cb) => {
    const result = await args.graphql<AllPosts<FullPost>, any>(allPostsQuery)
    if (result.errors) {
        args.reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    const posts: {node: FullPost}[] = result.data.allMicrocmsPosts.edges
    try {
        const transformer = makeMd2HtmlConvertor()
        await Promise.all(
            posts.map(async (p, idx) => {
                const result = await transformer.process(p.node.content)
                return args.actions.createPage({
                    path: getLinkForPost(p.node),
                    component: resolve('./src/templates/post.tsx'), // origin is set in tricky path.
                    context: {
                        post: { ...p.node, content: result.contents },
                        prevPost: idx > 0 ? posts[idx - 1].node : undefined,
                        nextPost: idx + 1 < posts.length ? posts[idx + 1].node : undefined
                    }
                })
            })
        )
    } catch(e) {
        args.reporter.panicOnBuild(`Error while creating page.`)
    }
    
}

const allPostsQuery = `
{
    allMicrocmsPosts(sort: {fields: [createdAt], order: ASC}) {
        edges {
            node {
                id
                createdAt
                title
                exerpt
                content
            }
        }
    }
}`

function makeMd2HtmlConvertor() {
    return unified()
        .use(markdown_in)
        .use(slug)
        .use(remark2rehype)
        .use(html_out as unknown as any)
}
