import React from "react"
import { FullPost } from "../querytypes/post"
import style from "../style/postpage.module.scss"
import { Link } from "gatsby"
import { Date } from "../components/date"
import { PostLink } from "../components/link"
import { boolAttr } from "../util/attributes"
import { Helmet } from "react-helmet"

const Head: React.FC<{title: string}> = (props) => (
    <Helmet>
        <meta charSet="utf-8"/>
        <title>{props.title} | Bear Web Apps</title>
    </Helmet>
)

export default (props: { pageContext: { post: FullPost, prevPost?: FullPost, nextPost?: FullPost }}) => {
    const { post } = props.pageContext
    return (
        <div className={style.page}>
            <Head title={post.title} />
            <div className={style.main}>
                <Link to="/" className={style.back2top}>Honey32 Bear Web Apps</Link>
                <h1 className={style.title}>{post.title}</h1>
                <div className={style.date}><Date dateTime={post.createdAt} format={{date: true, time: true}}/></div>
                <div className={style.content} dangerouslySetInnerHTML={{__html: post.content}}></div>
                <PrevAndNext prev={props.pageContext.prevPost} next={props.pageContext.nextPost}></PrevAndNext>
            </div>
        </div>
    )
}

function PrevAndNext(props: { prev?: FullPost, next?: FullPost }) {
    return (
        <div className={style.prevNext}>
            <div className={style.button} data-available={boolAttr(props.prev)}>{ props.prev ? <><PostLink to={props.prev}>前の記事:<wbr/>{props.prev.title}</PostLink></> : <>最も古い記事です</>}</div>
            <div className={style.button} data-available data-top><Link to="/">トップページに戻る</Link></div>
            <div className={style.button} data-available={boolAttr(props.next)}>{ props.next ? <><PostLink to={props.next}>次の記事:<wbr/>{props.next.title}</PostLink></> : <>最も新しい記事です</>}</div>
        </div>
    )
}