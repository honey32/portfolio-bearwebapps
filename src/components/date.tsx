import React from "react"

interface DateTimeFormat {
    date: true
    time: boolean
}

export function Date(props: { dateTime: string, format: DateTimeFormat }) {
    const showsTime = props.format.time
    return (
        <time dateTime={props.dateTime}>{
            showsTime 
                ? props.dateTime.slice(0, 19).replace(/-/g, '/').replace('T', ' ')
                : props.dateTime.slice(0, 10).replace(/-/g, '/')
        }</time>
    )
}