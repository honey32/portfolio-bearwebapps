export interface AllPosts<Post> {
    allMicrocmsPosts: {
        edges: { node: Post }[]
    }
}

export interface FullPost {
    id: string
    createdAt: string
    title: string
    exerpt: string
    content: string
}

export type PartialPost<K extends keyof FullPost> = Pick<FullPost, K>
