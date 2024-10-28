import { cache, Suspense } from "react"
import { Metadata } from "next"
import { BookOpenIcon } from "@heroicons/react/24/outline"

import { getAllBlogInfo } from "@/lib/contentful"
import { BlogListLoading } from "@/components/blog/home/loading"
import { BlogContentList } from "@/components/blog/home/content-list"
import { metadataTemplate } from "@/lib/meta"

export const metadata: Metadata = metadataTemplate({
    title: "blog",
    description: "jakka's blog. might contains yapperino.",
    addSiteNameInSocialTitle: true
})

const getData = cache(getAllBlogInfo)

export default async function BlogHome() {
    const data = await getData()
    return (
        <main className="flex flex-col flex-grow mx-auto lg:ml-[25%] lg:mr-0 pt-4 lg:pt-10 lg:mt-14 w-3/4 lg:w-1/2 pb-28">
            <h1 className="flex gap-x-1 font-inter font-medium text-4xl lg:text-3xl lg:mt-4 text-center lg:text-left">My Blog <BookOpenIcon className="w-9 lg:w-8 pt-1" /></h1>
            <div className="flex w-full">
                <Suspense fallback={BlogListLoading()}>
                    <BlogContentList data={data} />
                </Suspense>
            </div>
        </main>
    )
}
