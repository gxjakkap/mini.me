import { localeDateString } from "@/lib/dateformat"

import type { AllBlogData } from "@/lib/contentful"
import Link from "next/link"

const formatTags = (tag: string) => {
    return `#${tag.split(" ").join("_").toLowerCase()}`
}

export const BlogContentList = ({ data }: { data: AllBlogData[] }) => {
    return (
        <div className="mt-10 flex w-full flex-col gap-y-4 font-inter">
            {data.map((ea) => {
                const tagString = ea.tags.map(tag => formatTags(tag)).join(" ")
                return (
                    <Link href={`/blog/${ea.slug}`} key={ea.slug}>
                        <div className="mt-4 flex cursor-pointer flex-col gap-y-[0.35rem] lg:gap-y-1">
                            <h3 className="text-xl font-medium text-[#313638] dark:text-[#e0e0e0] lg:text-2xl">{ea.title}</h3>
                            <p className="text-sm text-[#525a5e] dark:text-[#a0a8ab] lg:text-base">{localeDateString(ea.date)} - {tagString}</p>
                            <p className="text-sm text-[#525a5e] dark:text-[#a0a8ab] lg:text-base">{ea.metaDesc}</p>
                            <hr className="mt-1 text-[#525a5e] dark:text-[#a0a8ab]" />
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}