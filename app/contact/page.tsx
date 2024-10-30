import { Metadata } from "next"

import Contact from "@/components/contact/main"
import { metadataTemplate } from "@/lib/meta"


export const metadata: Metadata = metadataTemplate({
    title: "contact",
    description: "Means of contact for jakka",
    addSiteNameInSocialTitle: true
})

export default function ContactPage() {
    return (
        <Contact />
    )
}