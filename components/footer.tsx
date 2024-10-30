'use client'

import { useEffect, useState } from "react"

import { guntxFetching } from "@/lib/fetchHelper"

interface nowPlaying {
    "album": string,
    "album_image_url": string,
    "artist": string,
    "is_playing": boolean,
    "song_url": string,
    "title": string
}

const blankNp: nowPlaying = {
    "album": "",
    "album_image_url": "",
    "artist": "",
    "is_playing": false,
    "song_url": "",
    "title": ""
}

const getNowPlaying = async() => {
    //return await (await fetch('https://guntxjakka.me/api/listeningto')).json()
    return await guntxFetching('listeningto')
}

export default function SiteFooter() {
    const [npdata, setNpdata] = useState<nowPlaying>(blankNp)

    useEffect(() => {
        getNowPlaying().then(res => {
            setNpdata(res)
            console.log(npdata)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <footer className="mx-auto flex w-1/2 flex-col pb-5 text-[#a5a5a5] dark:text-zinc-500 lg:flex-row">
            <span className="mx-auto lg:ml-0 lg:mr-auto">jakka - 2024</span>
            {(npdata.title.length > 0) ? (
                <div className="font-inter hover:underline">
                    <a href={npdata.song_url} target="blank" rel="noopener,noreferrer" className="flex flex-col gap-x-[0.2rem] text-center lg:flex-row">
                        <div>listening to</div> 
                        <div>{npdata.title} by {npdata.artist}</div>
                    </a>
                </div>
            ) : (<></>)}
            <div className="mx-auto flex gap-x-3 font-inter underline lg:ml-auto lg:mr-0">
                <a href="https://github.com/gxjakkap" target="_blank" rel="noopener,noreferrer">github</a>
                <a href="https://tree.guntxjakka.me/" target="_blank" rel="noopener,noreferrer">links</a>
            </div>
        </footer>
    )
}