import React from "react"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import { PartialPost } from "../querytypes/post"
import style from "../style/index.module.scss"
import { Date } from "../components/date"
import { PostLink } from "../components/link"
import { AppInfo, apps } from "../querytypes/app"

type PostInfo = PartialPost<'id' | 'exerpt' | 'title' | 'content' | 'createdAt'>

const Post: React.FC<PostInfo> = p => (
    <div className={style.item} key={p.id}>
        <h3 className={style.title}><PostLink to={p}>{p.title}</PostLink></h3>
        <div className={style.time}><Date dateTime={p.createdAt} format={{date: true, time: false}}/></div>
        <div className={style.exerpt} dangerouslySetInnerHTML={{__html: p.exerpt}}></div>
        {/* <div className={style.content}dangerouslySetInnerHTML={{__html: p.content}}></div>s */}
    </div>
)

const Head: React.FC = () => (
    <Helmet>
        <meta charSet="utf-8" />
        <title>Bear Web Apps</title>
    </Helmet>
)

const App: React.FC<AppInfo> = a => (
    <div className={style.item} key={a.name}>
        <h3 className={style.title}><a href={a.url} target="_blank">{a.name}</a></h3>
        <div className={style.description}>{a.description}</div>
    </div>
)

export default (p: any) => {
    const posts: {node: PostInfo}[] = p.data.allMicrocmsPosts.edges
    return (
        <div>
            <Head/>
            <h1>Honey32 bear web apps</h1>
            <div className={style.wrap}>
                { /* Apps */ }
                <div className={style.apps}>
                    <h2 className={style.heading}>作成したアプリ</h2>
                    <div className={style.list}>{
                        apps.map(App)
                    }</div>
                </div>
                { /* Posts */ }
                <div className={style.recentPosts}>
                    <h2 className={style.heading}>最近の投稿</h2>
                    <div className={style.list}>{
                        posts.map(p => p.node).map(Post)
                    }</div>
                </div>
            </div>
            
            
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

