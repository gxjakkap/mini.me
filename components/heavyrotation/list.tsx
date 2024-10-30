'use client'

import useSWR from "swr"
import { useState } from "react"

import { guntxFetching } from "@/lib/fetchHelper"
import { HeavyRotationLoading } from "./loading"
import { XMarkIcon } from "@heroicons/react/24/outline"

const getTrackId = (spotifyUri: string) => {
    const s = spotifyUri.split(":")
    return s[2]
}

export const HeavyRotationList = () => {
    const { data, error: isError, isLoading } = useSWR('toptracks', guntxFetching)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTrack, setSelectedTrack] = useState<number | null>(null)

    const openModal = (track: number) => {
        setSelectedTrack(track)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    if (isLoading) return HeavyRotationLoading()
    else if (isError) return (<p className="text-center font-inter lg:text-left">Error loading Jakka&apos;s heavy rotation. Please try again.</p>)
    else {
        return (
            <>
                <div className="flex flex-col gap-y-2 pb-10">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {data.items.map((ea: any, i: number) => (
                        <button
                            className="text-left font-inter hover:underline"
                            key={i}
                            onClick={() => openModal(i)}
                        >
                            {i+1}. {ea.artist} - <span className="font-bold">{ea.name}</span>
                        </button>
                    ))}
                </div>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg bg-black text-white">
                            <div 
                                className="absolute inset-0 bg-cover bg-center"
                                style={{backgroundImage: `url('${data.items[selectedTrack || 0]['image_link'] || "https://placehold.co/400"}')`}}
                            ></div>
                            <div className="absolute inset-0 bg-black/60"></div>
                            <div className="relative z-10 flex h-full flex-col p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="font-inter text-xl font-bold text-[#e0e0e0] dark:text-[#e0e0e0]">{data.items[selectedTrack || 0]['name']}</h2>
                                    <button
                                        onClick={closeModal}
                                        className="text-[#e0e0e0]"
                                        aria-label="Close modal"
                                    >
                                        <XMarkIcon className="w-6" />
                                    </button>
                                </div>
                                <p className="text-[#e0e0e0] dark:text-[#e0e0e0]">by {data.items[selectedTrack || 0]['artist']}</p>
                                <div className="grow"></div>
                                <div className="pb-2 lg:pb-10">
                                    <iframe 
                                        className="rounded-2xl" 
                                        src={`https://open.spotify.com/embed/track/${getTrackId(data.items[selectedTrack || 0]['uri'])}`} 
                                        width="100%" 
                                        height="152" 
                                        allowFullScreen={false} 
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}