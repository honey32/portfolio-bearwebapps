import React from "react"

export interface AppInfo {
    name: string
    url: string
    description: JSX.Element
}

export const apps: AppInfo[] = [
    { 
        name: 'Notestand', 
        url: 'https://notestand.bearwapps.com/index-ja.html',
        description: <>Googleドライブを利用するPDF楽譜ビューワー。<br/>正しくあいうえお順に楽譜を並べる機能も搭載。<br/>PDFの楽譜ファイルを快適に管理・閲覧できます.</>
    },
    { 
        name: 'Honey Tetris', 
        url: 'https://tetris.bearwapps.com/',
        description: <>テトリスもどきです.</>
    },
]