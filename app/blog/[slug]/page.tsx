'use server'
/// <reference path="@/lib/types/rttjsx.d.ts">
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache, Suspense } from 'react'

import { getPostData } from "@/lib/contentful"
import { BlogContent } from '@/components/blog/content/layout'
import { BlogLoading } from '@/components/blog/content/loading'

type Props = {
    params: Promise<{ slug: string }>
}
type MetadataProps = { params: Promise<{ slug: string }> }


const getData = cache(getPostData)

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata>{
    const slug = (await params).slug
    const data = await getData(slug)

    return {
        title: { default: data.frontMatter?.title || "not found", template: "%s | jakka" },
        description: data.frontMatter?.metaDesc || "",
        authors: { name: "Jakkaphat Chalermphanaphan", url: "https://guntxjakka.me" },
        openGraph: {
            title: data.frontMatter?.title || "not found",
            description: data.frontMatter?.metaDesc || "",
            type: "website",
            images: data.frontMatter?.socialImage || 'https://res.cloudinary.com/dynrld3nm/image/upload/f_auto,q_auto,w_300/guntxjakka.me/me_2024.jpg',
            siteName: "jakka"
        },
        twitter: {
            card: "summary_large_image",
            title: data.frontMatter?.title || "not found",
            description: data.frontMatter?.metaDesc || "",
            site: "@guntxjakka",
            images: data.frontMatter?.socialImage || 'https://res.cloudinary.com/dynrld3nm/image/upload/f_auto,q_auto,w_300/guntxjakka.me/me_2024.jpg',
    
        }
    }
}

export default async function BlogPage({ params }: Props){
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
            <Suspense fallback={BlogLoading()}>
                <BlogContent data={data} />
            </Suspense>
        )
    }
}