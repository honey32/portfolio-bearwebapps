import React from "react"
import { FullPost } from "../querytypes/post";
import { Link } from "gatsby";
import { PropsWithChildren } from "react";
import { getLinkForPost } from "../util/link";

export function PostLink(props: PropsWithChildren<{ to: Pick<FullPost, 'id'| 'title' | 'createdAt'> }>) {
    return <Link {...props} to={getLinkForPost(props.to)}></Link>
}

