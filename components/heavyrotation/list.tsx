'use client'

import useSWR from "swr"

import { guntxFetching } from "@/lib/fetchHelper"
import { HeavyRotationLoading } from "./loading"

export const HeavyRotationList = () => {
    const { data, error: isError, isLoading } = useSWR('toptracks', guntxFetching)
    console.log(data)

    if (isLoading) return HeavyRotationLoading()
    else {
        console.log(data)
        return (
            <div className="flex flex-col gap-y-2 pb-10">
                {data.items.map((ea: any, i: number) => (
                    <a href={ea.link} className="font-inter" key={i} target="_blank" rel="noopener,noreferrer">{i+1}. {ea.artist} - <span className="font-bold">{ea.name}</span></a>
                ))}
            </div>
        )
    }
}