import type { Metadata } from "next"

import { metadataTemplate } from "@/lib/meta"
import { HeavyRotationList } from "@/components/heavyrotation/list"

export const metadata: Metadata = metadataTemplate({
    title: "heavy routation",
    description: "jakka's heavy rotation.",
    addSiteNameInSocialTitle: true
})

export default function HeavyRotationPage() {
    return (
        <main className="flex flex-col flex-grow mx-auto lg:ml-[25%] lg:mr-0 pt-4 lg:pt-10 lg:mt-14 w-3/4 lg:w-1/2">
            <h1 className="font-inter font-medium text-4xl lg:text-3xl mt-8 text-center lg:text-left">Jakka's heavy rotation🎶</h1>
            <div className="flex flex-col gap-y-3 mt-5">
                <p className="text-[#313638] dark:text-[#e0e0e0]">Period: 4w</p>
                <HeavyRotationList />
            </div>
        </main>
    )
}