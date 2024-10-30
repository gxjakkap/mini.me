'use client'

import { Turnstile } from "@marsidev/react-turnstile"
import { Dispatch, FormEvent, SetStateAction } from "react"

import { HandleFormSubmitResponse, TurnstileStatus } from "@/app/contact/actions"

type SetFormStatus = Dispatch<SetStateAction<"success" | "failed" | "pending" | "loading" | "captcha">>

export function ContactForm({ sa, stts, sfs, tts }: { sa: (formData: FormData, turnstileStatus: TurnstileStatus) => Promise<HandleFormSubmitResponse>, stts: Dispatch<SetStateAction<"success" | "error" | "expired" | "required">>, sfs: SetFormStatus, tts: TurnstileStatus }) {
    const handleFormSubmit = async (data: FormData) => {
        if (!data.get('inq') || !data.get('name') || !data.get('email')){
            sfs('failed')
            return
        }
        const res = await sa(data, tts)
        if (res.status === 200){
            sfs('success')
        }
        else {
            sfs('failed')
        }
    }
    
    return (
        <form className="flex flex-col gap-y-3" action={(formData: FormData) => handleFormSubmit(formData)}>
            <div className="">
                <label className="font-inter" htmlFor="name">Your name</label>
                <input className="w-full px-4 py-[0.5rem] box-border border-2 border-solid border-[#ccc] rounded-[0.4rem] bg-[#f8f8f8] font-inter resize-none" type="text" name="name" id="name" placeholder="Rejoice"/>
            </div>

            <div className="">
                <label className="font-inter" htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="rejoice@kmutt.ac.th" className="w-full px-4 py-[0.5rem]    box-border border-2 border-solid border-[#ccc] rounded-[0.4rem] bg-[#f8f8f8] font-inter resize-none" />
            </div>

            <label className="font-inter" htmlFor="inq">Inquiries</label>
            <textarea className="w-full h-36 px-4 py-4 box-border border-2 border-solid rounded-[0.4rem] border-[#ccc] bg-[#f8f8f8] text-base resize-none font-inter" name="inq" id="inq" placeholder="Your inquiries here..."></textarea>
            <Turnstile 
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                onError={() => stts("error")}
                onExpire={() => stts("expired")}
                onSuccess={() => {
                    stts("success")
                }}
            />
            <button id="submit-btn" className="inline-block outline-0 border-none cursor-pointer rounded-[0.4rem] text-base font-inter h-10 bg-[#0000000d] text-[#333333] hover:bg-[#33333333] dark:bg-[#e0e0e01a] dark:text-[#e0e0e0] dark:hover:bg-[#e0e0e033] px-4" type="submit">Submit</button>
        </form>
    )
}