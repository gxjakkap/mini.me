import type { AllProjectData } from "@/lib/contentful"
import Link from "next/link"

const formatTags = (tag: string) => {
    return `#${tag.split(" ").join("_").toLowerCase()}`
}

export const ProjectList = ({ data }: { data: AllProjectData[] }) => {
    return (
        <div className="flex flex-col w-full font-inter mt-10 gap-y-4">
            {data.map((ea) => {
                const tagString = ea.tags.map(tag => formatTags(tag)).join(" ")
                return (
                    <Link href={`/project/${ea.slug}`} key={ea.slug}>
                        <div className="flex flex-col gap-y-[0.35rem] lg:gap-y-1 mt-4 cursor-pointer">
                            <h3 className="text-xl lg:text-2xl text-[#313638] dark:text-[#e0e0e0] font-medium">{ea.title}</h3>
                            <p className="text-sm lg:text-base text-[#525a5e] dark:text-[#a0a8ab]">{tagString}</p>
                            <p className="text-sm lg:text-base text-[#525a5e] dark:text-[#a0a8ab]">{ea.description}</p>
                            <hr className="text-[#525a5e] dark:text-[#a0a8ab] mt-1" />
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}