'use server'
/// <reference path="@/lib/types/rttjsx.d.ts">
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache, Suspense } from 'react'

import { getProjectData } from "@/lib/contentful"
import { ProjectContent } from '@/components/projects/content/layout'
import { ProjectLoading } from '@/components/projects/content/loading'

type Props = { params: Promise<{ slug: string }> }

const getData = cache(getProjectData)

export async function generateMetadata({ params }: Props): Promise<Metadata>{
    const slug = (await params).slug
    const data = await getData(slug)

    return {
        title: { default: data.data?.title || "not found", template: "%s | jakka" },
        description: data.data?.description || "",
        authors: { name: "Jakkaphat Chalermphanaphan", url: "https://guntxjakka.me" },
        openGraph: {
            title: data.data?.title || "not found",
            description: data.data?.description || "",
            type: "website",
            images: data.data?.thumbnail || 'https://res.cloudinary.com/dynrld3nm/image/upload/f_auto,q_auto,w_300/guntxjakka.me/me_2024.jpg',
            siteName: "jakka"
        },
        twitter: {
            card: "summary_large_image",
            title: data.data?.title || "not found",
            description: data.data?.description || "",
            site: "@guntxjakka",
            images: data.data?.thumbnail || 'https://res.cloudinary.com/dynrld3nm/image/upload/f_auto,q_auto,w_300/guntxjakka.me/me_2024.jpg',
    
        }
    }
}

export default async function ProjectPage({ params }: Props){
    const slug = (await params).slug
    const data = await getData(slug)    
    if (data.error){
        if (data.errorCode === 404){
            notFound()
        }
        else {
            throw new Error("ContentFetchingError")
        }
    }
    else {
        return (
            <Suspense fallback={ProjectLoading()}>
                <ProjectContent data={data.data} />
            </Suspense>
        )
    }
}