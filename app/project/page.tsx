import { cache, Suspense } from "react"
import { Metadata } from "next"
import { FolderIcon } from "@heroicons/react/16/solid"

import { getAllProjects } from "@/lib/contentful"
import { ProjectListLoading } from "@/components/projects/home/loading"
import { ProjectList } from "@/components/projects/home/projects-list"
import { metadataTemplate } from "@/lib/meta"


export const metadata: Metadata = metadataTemplate({
    title: "projects",
    description: "list of projects by jakka. might or might not be useful.",
    addSiteNameInSocialTitle: true
})

const getData = cache(getAllProjects)

export default async function ProjectHome() {
    const data = await getData()
    return (
        <main className="mx-auto flex w-3/4 grow flex-col pb-28 pt-4 lg:ml-[25%] lg:mr-0 lg:mt-14 lg:w-1/2 lg:pt-10">
            <h1 className="flex gap-x-2 text-center font-inter text-4xl font-medium lg:mt-4 lg:text-left lg:text-3xl">My Projects <FolderIcon className="w-8 text-[#f7b81d]" /></h1>
            <div className="flex w-full">
                <Suspense fallback={ProjectListLoading()}>
                    <ProjectList data={data} />
                </Suspense>
            </div>
        </main>
    )
}
