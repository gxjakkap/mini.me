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
        <main className="mx-auto flex w-3/4 grow flex-col pb-28 pt-4 lg:ml-[25%] lg:mr-0 lg:mt-14 lg:w-1/2 lg:pt-10">
            <h1 className="flex gap-x-1 text-center font-inter text-4xl font-medium lg:mt-4 lg:text-left lg:text-3xl">My Blog <BookOpenIcon className="w-9 pt-1 lg:w-8" /></h1>
            <div className="flex w-full">
                <Suspense fallback={BlogListLoading()}>
                    <BlogContentList data={data} />
                </Suspense>
            </div>
        </main>
    )
}
