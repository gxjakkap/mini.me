import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"

import stack from "@/data/techstack.json"
import { Metadata } from "next"
import { metadataTemplate } from "@/lib/meta"
import style from "./home.module.css"
import { Skills } from "@/components/home/stack"
import { Education } from "@/components/home/edu"

const calcAge = () => {
  'use client'
  const birthDay = new Date('September 25, 2005, 00:00:00')
  const today = new Date()
  const diff = ((today.getTime() - birthDay.getTime()) / 1000) / (60*60*24)
  return Math.abs(Math.floor(diff / 365.25))
}

export const metadata: Metadata = metadataTemplate({
    title: "",
    description: "An aspiring Computer Engineering student.",
    addSiteNameInSocialTitle: false,
    isHome: true
})

export default function Home() {
  
  return (
    <main className="mx-auto flex w-3/4 grow flex-col pt-4 lg:ml-[25%] lg:mr-0 lg:mt-14 lg:w-1/2 lg:pt-10">
      <h1 className="text-center font-inter text-4xl font-medium lg:mt-4 lg:text-left lg:text-3xl xl:mt-20">Hi! I&apos;m <span className={style.hometitlename}>j</span><span className={style.hometitlename}>a</span><span className={style.hometitlename}>k</span><span className={style.hometitlename}>k</span><span className={style.hometitlename}>a</span><span className={style.hometitlehand}>👋🏼</span></h1>
      <section className="flex scroll-mt-24 flex-col pb-6 lg:scroll-mt-48 lg:gap-y-32 lg:pb-52 xl:scroll-mt-56" id="main">
          <div className="flex flex-col-reverse gap-x-8 lg:flex-row">
            <div className="my-8 flex flex-col-reverse lg:flex-col">
                <p className="font-inter">
                    &emsp;A <span>{calcAge()}</span>-year-old Computer Engineering student at <a href="https://kmutt.ac.th" target="_blank" rel="noopener,noreferrer" className="text-blue-500 hover:underline ">KMUTT</a>. I enjoy playing video games, programming, and photography. Over the years, I&apos;ve worked on various projects, mainly focused on both frontend and backend development. I&apos;m quite familiar with Tailwind CSS and currently learning frameworks like React. Additionally, I love creating Discord bots and experimenting with random tech projects.
                </p>
                <div className="mx-auto my-2 flex gap-x-6 xl:mt-12">
                    <button className="m-0 inline-block cursor-pointer touch-manipulation select-none list-none whitespace-nowrap rounded-lg border-0 bg-[#3333331a] p-3 text-center align-baseline font-inter text-base font-medium leading-5 text-[#333333] hover:bg-[#33333333] dark:bg-[#e0e0e01a] dark:text-[#e0e0e0] dark:hover:bg-[#e0e0e033]"><Link href={'/projects'}>What I did</Link></button>
                    <button className="m-0 inline-block cursor-pointer touch-manipulation select-none list-none  whitespace-nowrap rounded-lg border-0 bg-[#3333331a] p-3 text-center align-baseline font-inter text-base font-medium leading-5 text-[#333333] hover:bg-[#33333333] dark:bg-[#e0e0e01a] dark:text-[#e0e0e0] dark:hover:bg-[#e0e0e033]"><Link href={'/contact'}>Contact me</Link></button>
                </div>
            </div>
            <Image src="https://res.cloudinary.com/dynrld3nm/image/upload/f_auto,q_auto/guntxjakka.me/me_2024" width={"350"} height={"350"} alt="me" className="mx-auto mt-[18px] size-[250px] drop-shadow-lg md:size-[350px] lg:size-[350px]" />
          </div>
          <div className="mx-auto flex cursor-pointer flex-col text-center text-sm text-[#525a5e]">
            <Link href={"#more"}>
              <p className="font-inter text-[#313638] dark:text-[#e0e0e0]">Scroll down to learn more about me</p>
              <ChevronDoubleDownIcon className="mx-auto w-7 text-[#313638] dark:text-[#e0e0e0]" />
            </Link>
          </div>
      </section>
      <section className="flex scroll-mt-14 flex-col-reverse gap-x-8 pb-52 lg:scroll-mt-48 lg:flex-row-reverse lg:pb-56" id="more">
        <div className="flex flex-col gap-y-3">
          <h2 className="mt-4 text-center font-inter text-3xl font-medium lg:text-right">
            More about me🙋🏼‍♂️
          </h2>
          <p className="font-inter">&emsp;I was introduced to computer when I was a kid. And it sparked my interest in them ever since kindergarten. I was excited by flash games on Facebook, fascinated by how computers could do whatever you told them to.</p>
          <p className="font-inter">&emsp;In middle school, learning Scratch and Python sparked my interest in programming. In 11th grade, I built Parcetrace, learning full-stack development and UI design, and joined competitions. I also created projects like g;ode Project and Rankbot.</p>
          <p className="font-inter">&emsp;Now, I&apos;m currently in a Computer Engineering program, exploring various fields and trying everything to figure out what my specialty is.</p>
        </div>
        <Image src="https://res.cloudinary.com/dynrld3nm/image/upload/f_auto,q_auto/guntxjakka.me/me-2.jpg" width={"350"} height={350} alt="me" className="mx-auto aspect-square w-[250px] drop-shadow-lg lg:mt-[65px] lg:size-[350px]" />
      </section>
      <Education />
      <Skills data={stack} />
    </main>
  )
}
