import { FullPost } from "../querytypes/post"

export function getLinkForPost(post: Pick<FullPost, 'title' | 'createdAt' | 'id'>) {
    return `/posts/${post.createdAt.substring(0, 10).replace(/-/g, '')}-${post.id.substring(0, 4)}`
}