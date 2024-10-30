'use client'

import { useState } from "react"
import { EnvelopeIcon } from "@heroicons/react/24/outline"

import { handleFormSubmit } from "@/app/contact/actions"
import { ContactForm } from "@/components/contact/form"
import { ContactSuccessModal } from "@/components/contact/success"
import { ContactErrorModal } from "@/components/contact/error"
import { DiscordIcon, InstagramIcon, LinkedInIcon } from "@/components/contact/svg"

export default function Contact() {
    const [turnstileStatus, setTurnstileStatus] = useState<"success" | "error" | "expired" | "required">("required")
    const [formStatus, setFormStatus] = useState<"success" | "failed" | "pending" | "loading" | "captcha">("pending")
    
    return (
        <main className="mx-auto flex w-3/4 grow flex-col pt-4 lg:ml-[25%] lg:mr-0 lg:mt-14 lg:w-1/2 lg:pt-10">
            <h1 className="text-center font-inter text-4xl font-medium lg:text-left lg:text-3xl">Contact me📥</h1>
            <div className="mt-4 flex flex-col">
                <div className="mt-3 mb-3 flex flex-col lg:flex-row gap-y-2 lg:gap-x-8">
                    <a className="flex gap-x-3 font-inter" href="https://discordapp.com/users/480228633525354506" target="_blank" rel="noopener,noreferrer">
                        <DiscordIcon className="w-8 border-none text-[#525a5e] antialiased dark:text-[#a0a8ab]" />
                        <p>@guntxjakka</p>
                    </a>
                    <a className="flex gap-x-3 font-inter" href="https://instagram.com/guntxjakka" target="_blank" rel="noopener,noreferrer">
                        <InstagramIcon className="w-8 border-none text-[#525a5e] antialiased dark:text-[#a0a8ab]" />
                        <p>@guntxjakka</p>
                    </a>
                    <a className="flex gap-x-3 font-inter" href="https://www.linkedin.com/in/jchalermphanaphan/" target="_blank" rel="noopener,noreferrer">
                        <LinkedInIcon className="w-8 border-none text-[#525a5e] antialiased dark:text-[#a0a8ab]" />
                        <p>@jchalermphanaphan</p>
                    </a>
                    <a className="flex gap-x-3 font-inter" href="mailto:gunt@guntxjakka.me" target="_blank" rel="noopener,noreferrer">
                        <EnvelopeIcon className="w-8 text-[#525a5e] dark:text-[#a0a8ab]"/>
                        <p>gunt@guntxjakka.me</p>
                    </a>
                </div>
                <div className="mb-3">
                    <ContactForm sa={handleFormSubmit} stts={setTurnstileStatus} sfs={setFormStatus} tts={turnstileStatus} />
                    {(formStatus === "success") && <ContactSuccessModal setFormStatus={setFormStatus} />}
                    {(formStatus === "failed") && <ContactErrorModal setFormStatus={setFormStatus} type="failed" />}
                    {(formStatus === "captcha") && <ContactErrorModal setFormStatus={setFormStatus} type="captcha" />}
                </div>
            </div>
        </main>
    )
}