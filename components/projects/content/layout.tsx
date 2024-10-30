'use client'

import RichText from '@madebyconnor/rich-text-to-jsx'
import { FolderIcon } from "@heroicons/react/16/solid"
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { ProjectData } from "@/lib/contentful"
import overrideOptions from "@/lib/contentfulRendererOverride"

export const ProjectContent = ({ data }: { data: ProjectData["data"] }) => {
    return (
        <article className="mx-auto flex w-3/4 grow flex-col pb-28 pt-4 lg:ml-[25%] lg:mr-0 lg:mt-14 lg:w-1/2 lg:pt-10">
            <div className="flex flex-col gap-y-4 lg:gap-y-2">
                <h1 className="text-center font-inter text-4xl font-medium text-[#313638] dark:text-[#e0e0e0] lg:mt-4 lg:text-left lg:text-3xl">
                    {data?.title}
                </h1>
                <LazyLoadImage
                    alt={'thumbnail'}
                    width={450}
                    placeholder={<div className="mx-auto h-[150px] w-[250px] rounded-2xl bg-zinc-200 lg:mx-0 lg:h-[350px] lg:w-[450px]"></div>}
                    className="mx-auto my-2 lg:mx-0"
                    src={data?.thumbnail || "https://cdn.statically.io/og/OOPS.jpg"}
                />
{/*                 <img width={450} className="max-w-screen my-2 mx-auto lg:mx-0" src={data?.thumbnail || "https://cdn.statically.io/og/OOPS.jpg"} alt="thumbnail" /> */}
                <div className="mx-auto my-2 flex gap-x-4 lg:mx-0">
                    {(data?.githubLink !== null) && (<button className="m-0 inline-block cursor-pointer touch-manipulation select-none list-none  whitespace-nowrap rounded-lg border-0 bg-[#3333331a] p-3 text-center align-baseline font-inter text-base font-medium leading-5 text-[#333333] hover:bg-[#33333333] dark:bg-[#e0e0e01a] dark:text-[#e0e0e0] dark:hover:bg-[#e0e0e033]"><a href={data?.githubLink || "#"} className="flex gap-x-1" target='_blank' rel='noopener,noreferrer'> <FolderIcon className="w-5" /> Repo</a></button>)}
                    {(data?.projectLink) && (<button className="m-0 inline-block cursor-pointer touch-manipulation select-none list-none  whitespace-nowrap rounded-lg border-0 bg-[#3333331a] p-3 text-center align-baseline font-inter text-base font-medium leading-5 text-[#333333] hover:bg-[#33333333] dark:bg-[#e0e0e01a] dark:text-[#e0e0e0] dark:hover:bg-[#e0e0e033]"><a href={data?.projectLink || "#"} className="flex gap-x-1" target='_blank' rel='noopener,noreferrer'><ArrowTopRightOnSquareIcon className="w-5" /> Link</a></button>)}
                </div>
                <div className="font-inter text-base">
                    <RichText richText={data?.content} overrides={overrideOptions}/>
                </div>
                {((typeof data?.stack !== undefined) && (data?.stack !== null)) && (
                    <div className="flex w-full flex-col gap-y-1">
                        <h4 className="font-inter text-xl font-medium">Stack / Tools</h4>
                        <div className="my-4 flex max-w-screen-sm flex-wrap gap-x-8 gap-y-6 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
                            {data?.stack?.map(ea => (
                                <div className="flex flex-col gap-y-1 font-inter" key={ea.name}>
                                    <img className="mx-auto max-w-[50px]" src={ea.image} alt={`${ea.name} icon`} />
                                    <p className="text-center text-[#525a5e] dark:text-[#e0e0e0]">{ea.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    )
}