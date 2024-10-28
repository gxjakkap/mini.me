// import { useState } from "react"
import { EnvelopeIcon } from "@heroicons/react/24/outline"
import type { Metadata } from "next"

import { metadataTemplate } from "@/lib/meta"
import { DiscordIcon, InstagramIcon, LinkedInIcon } from "@/components/contact/svg"

/* import { handleFormSubmit } from "./actions"
import { ContactForm } from "@/components/contact/contact-form" */

export const metadata: Metadata = metadataTemplate({
    title: "contact",
    description: "Means of contact for jakka",
    addSiteNameInSocialTitle: true
})

export default function Contact() {
   /*  const [turnstileStatus, setTurnstileStatus] = useState<"success" | "error" | "expired" | "required">("required")
    const [formStatus, setFormStatus] = useState<"success" | "failed" | "pending" | "loading">("pending")
     */
    return (
        <main className="flex flex-col flex-grow mx-auto lg:ml-[25%] lg:mr-0 pt-4 lg:pt-10 lg:mt-14 w-3/4 lg:w-1/2">
            <h1 className="font-inter font-medium text-4xl lg:text-3xl mt-8 text-center lg:text-left">Contact me📥</h1>
            <div className="flex flex-col">
                {/* {(formStatus === "pending") && <ContactForm sa={handleFormSubmit} stts={setTurnstileStatus} />}
                {(formStatus === "success")} */}
                <div className="flex flex-col gap-y-6 mt-6"> {/* for future ref: flex gap-x-8 */}
                    <a className="flex font-inter gap-x-3" href="https://discordapp.com/users/480228633525354506" target="_blank" rel="noopener,noreferrer">
                        <DiscordIcon className="w-8 text-[#525a5e] dark:text-[#a0a8ab] antialiased border-none" />
                        <p>@guntxjakka</p>
                    </a>
                    <a className="flex font-inter gap-x-3" href="https://instagram.com/guntxjakka" target="_blank" rel="noopener,noreferrer">
                        <InstagramIcon className="w-8 text-[#525a5e] dark:text-[#a0a8ab] antialiased border-none" />
                        <p>@guntxjakka</p>
                    </a>
                    <a className="flex font-inter gap-x-3" href="https://www.linkedin.com/in/jchalermphanaphan/" target="_blank" rel="noopener,noreferrer">
                        <LinkedInIcon className="w-8 text-[#525a5e] dark:text-[#a0a8ab] antialiased border-none" />
                        <p>@jchalermphanaphan</p>
                    </a>
                    <a className="flex font-inter gap-x-3" href="mailto:gunt@guntxjakka.me" target="_blank" rel="noopener,noreferrer">
                        <EnvelopeIcon className="w-8 text-[#525a5e] dark:text-[#a0a8ab]"/>
                        <p>gunt@guntxjakka.me</p>
                    </a>
                </div>
            </div>
        </main>
    )
}