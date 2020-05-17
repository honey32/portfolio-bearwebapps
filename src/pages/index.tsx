import React from "react"
import { graphql, Link } from "gatsby"
import { PartialPost } from "../querytypes/post"
import style from "../style/index.module.scss"
import { Date } from "../components/date"
import { PostLink } from "../components/link"

type PostInfo = PartialPost<'id' | 'exerpt' | 'title' | 'content' | 'createdAt'>

const Post: React.FC<PostInfo> = p => (
    <div className={style.item} key={p.id}>
        <h3 className={style.title}><PostLink to={p}>{p.title}</PostLink></h3>
        <div className={style.time}><Date dateTime={p.createdAt} format={{date: true, time: false}}/></div>
        <div className={style.exerpt} dangerouslySetInnerHTML={{__html: p.exerpt}}></div>
        {/* <div className={style.content}dangerouslySetInnerHTML={{__html: p.content}}></div>s */}
    </div>
)

export default (p: any) => {
    const posts: {node: PostInfo}[] = p.data.allMicrocmsPosts.edges
    return (
        <div>
            <h1>Honey32 bear web apps</h1>
            <section className={style.recentPosts}>
                <h2 className={style.heading}>最近の投稿</h2>
                <div className={style.list}>{
                    posts.map(p => p.node).map(Post)
                }</div>
            </section>
        </div>)
}

export const query = graphql`
    {
        allMicrocmsPosts(limit: 4, sort: {fields: [createdAt], order: DESC}) {
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
    }
`

