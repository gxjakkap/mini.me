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
    }, [])

    return (
        <footer className="w-1/2 flex flex-col lg:flex-row mx-auto pb-5 text-[#a5a5a5] dark:text-zinc-500">
            <span className="mx-auto lg:ml-0 lg:mr-auto">jakka - 2024</span>
            {(npdata.title.length > 0) ? (
                <div className="hover:underline font-inter">
                    <a href={npdata.song_url} target="blank" rel="noopener,noreferrer" className="flex flex-col text-center lg:flex-row gap-x-[0.2rem]">
                        <div>listening to</div> 
                        <div>{npdata.title} by {npdata.artist}</div>
                    </a>
                </div>
            ) : (<></>)}
            <div className="flex mx-auto lg:ml-auto lg:mr-0 gap-x-3 font-inter underline">
                <a href="https://github.com/gxjakkap" target="_blank" rel="noopener,noreferrer">github</a>
                <a href="https://tree.guntxjakka.me/" target="_blank" rel="noopener,noreferrer">links</a>
            </div>
        </footer>
    )
}