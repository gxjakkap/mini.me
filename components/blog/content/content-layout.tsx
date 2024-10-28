'use client'

import RichText from '@madebyconnor/rich-text-to-jsx'

import { BlogData } from "@/lib/contentful"
import overrideOptions from "@/lib/contentfulRendererOverride"
import { localeDateString } from "@/lib/dateformat"
import { LazyLoadImage } from 'react-lazy-load-image-component'

export const BlogContent = ({ data }: { data: BlogData }) => {
    return (
        <article className="flex flex-col flex-grow mx-auto lg:ml-[25%] lg:mr-0 pt-4 lg:pt-10 lg:mt-14 w-3/4 lg:w-1/2 pb-28">
            <div className="flex flex-col gap-y-4 lg:gap-y-2">
                <h1 className="text-[#313638] dark:text-[#e0e0e0] font-inter font-medium text-4xl lg:text-3xl lg:mt-4 text-center lg:text-left">
                    {data.frontMatter?.title}
                </h1>
                <div className="flex flex-col lg:inline-flex lg:flex-row gap-y-[0.1rem] lg:gap-y-0 lg:gap-x-[0.4rem] text-center lg:text-left text-[#525a5e] dark:text-[#a0a8ab]">
                    <span>Jakkaphat Chalermphanaphan</span> 
                    <span className="hidden lg:inline">-</span> 
                    <span>{localeDateString(data.frontMatter?.date || "1 January 1970")}</span>
                    <span className="hidden lg:inline">-</span> 
                    <span>{data.readTime}</span>
                </div>
                {/* <img width={450} className="max-w-screen my-2 mx-auto lg:mx-0" src={data.frontMatter?.socialImage || "https://cdn.statically.io/og/OOPS.jpg"} alt="thumbnail" /> */}
                <LazyLoadImage
                    alt={'thumbnail'}
                    width={450}
                    placeholder={<div className="w-[250px] h-[150px] lg:w-[450px] lg:h-[350px] rounded-2xl bg-zinc-200 mx-auto lg:mx-0"></div>}
                    className="max-w-screen my-2 mx-auto lg:mx-0"
                    src={data?.frontMatter?.socialImage || "https://cdn.statically.io/og/OOPS.jpg"}
                />
                <div className="font-inter text-base-content">
                    <RichText richText={data.content} overrides={overrideOptions}/>
                </div>
            </div>
        </article>
    )
}