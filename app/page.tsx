import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"

import stack from "@/data/techstack.json"
import { Metadata } from "next"
import { metadataTemplate } from "@/lib/meta"
import style from "./home.module.css"
import { StackImageWithDark } from "@/components/home/stack"

const calcAge = () => {
  'use client'
  const birthDay = new Date('September 25, 2005, 00:00:00')
  const today = new Date()
  const diff = ((today.getTime() - birthDay.getTime()) / 1000) / (60*60*24)
  return Math.abs(Math.floor(diff / 365.25))
}

type SkillCategory = 'front' | 'back' | 'tools'


export const metadata: Metadata = metadataTemplate({
    title: "",
    description: "An aspiring Computer Engineering student.",
    addSiteNameInSocialTitle: false,
    isHome: true
})


export default function Home() {
  const dataMap: { name: SkillCategory; displayName: string }[] = [{name: 'front', displayName: 'Frontend'}, {name: 'back', displayName: 'Backend'}, {name: 'tools', displayName: 'Tools / Other languages'}]
  return (
    <main className="flex flex-col flex-grow mx-auto lg:ml-[25%] lg:mr-0 pt-4 lg:pt-10 lg:mt-14 w-3/4 lg:w-1/2">
      <h1 className="font-inter font-medium text-4xl lg:text-3xl lg:mt-4 text-center lg:text-left">Hi! I'm <span className={style.hometitlename}>j</span><span className={style.hometitlename}>a</span><span className={style.hometitlename}>k</span><span className={style.hometitlename}>k</span><span className={style.hometitlename}>a</span><span className={style.hometitlehand}>👋🏼</span></h1>
      <section className="flex flex-col pb-6 lg:pb-52 lg:gap-y-32 scroll-mt-14 lg:scroll-mt-48" id="main">
          <div className="flex flex-col-reverse lg:flex-row gap-x-8">
            <div className="flex flex-col-reverse lg:flex-col my-8">
                <p className="font-inter">
                    &emsp;A <span>{calcAge()}</span>-year-old Computer Engineering student at <a href="https://kmutt.ac.th" target="_blank" rel="noopener,noreferrer" className="text-blue-500 hover:underline ">KMUTT</a>. I enjoy playing video games, programming, and photography. Over the years, I've worked on various projects, mainly focused on both frontend and backend development. I'm quite familiar with Tailwind CSS and currently learning frameworks like React. Additionally, I love creating Discord bots and experimenting with random tech projects.
                </p>
                <div className="flex mx-auto my-2 gap-x-6">
                    <button className="bg-[#3333331a] text-[#333333] hover:bg-[#33333333] dark:bg-[#e0e0e01a] dark:text-[#e0e0e0] dark:hover:bg-[#e0e0e033] border-0 rounded-lg cursor-pointer inline-block font-inter font-medium text-base leading-5 list-none m-0 px-3 py-3 text-center align-baseline whitespace-nowrap select-none touch-manipulation"><Link href={'/projects'}>What I did</Link></button>
                    <button className="bg-[#3333331a] text-[#333333] hover:bg-[#33333333] dark:bg-[#e0e0e01a] dark:text-[#e0e0e0] dark:hover:bg-[#e0e0e033]  border-0 rounded-lg cursor-pointer inline-block font-inter font-medium text-base leading-5 list-none m-0 px-3 py-3 text-center align-baseline whitespace-nowrap select-none touch-manipulation"><Link href={'/contact'}>Contact me</Link></button>
                </div>
            </div>
            <Image src="https://res.cloudinary.com/dynrld3nm/image/upload/f_auto,q_auto/guntxjakka.me/me_2024" width={"350"} height={"350"} alt="me" className="w-[250px] lg:w-[350px] mt-[18px] mx-auto drop-shadow-lg" />
          </div>
          <div className="flex flex-col mx-auto text-[#525a5e] text-sm text-center cursor-pointer">
            <Link href={"#more"}>
              <p className="font-inter text-[#313638] dark:text-[#e0e0e0]">Scroll down to learn more about me</p>
              <ChevronDoubleDownIcon className="w-7 mx-auto text-[#313638] dark:text-[#e0e0e0]" />
            </Link>
          </div>
      </section>
      <section className="flex flex-col-reverse lg:flex-row-reverse gap-x-8 pb-52 scroll-mt-14 lg:scroll-mt-48" id="more">
        <div className="flex flex-col gap-y-3">
          <h2 className="font-inter font-medium text-3xl mt-4 text-center lg:text-right">
            More about me🙋🏼‍♂️
          </h2>
          <p className="font-inter">&emsp;I was introduced to computer when I was a kid. And it sparked my interest in them ever since kindergarten. I was excited by flash games on Facebook, fascinated by how computers could do whatever you told them to.</p>
          <p className="font-inter">&emsp;In middle school, learning Scratch and Python sparked my interest in programming. In 11th grade, I built Parcetrace, learning full-stack development and UI design, and joined competitions. I also created projects like g;ode Project and Rankbot.</p>
          <p className="font-inter">&emsp;Now, I'm currently in a Computer Engineering program, exploring various fields and trying everything to figure out what my specialty is.</p>
        </div>
        <Image src="https://res.cloudinary.com/dynrld3nm/image/upload/f_auto,q_auto/guntxjakka.me/me-2.jpg" width={"350"} height={350} alt="me" className="w-[250px] lg:w-[350px] lg:h-[350px] aspect-square lg:mt-[65px] mx-auto drop-shadow-lg" />
      </section>
      <section className="flex flex-col gap-x-8 pb-52 gap-y-2 font-inter scroll-mt-12 lg:scroll-mt-48" id="education">
          <h2 className="font-inter font-medium text-3xl mt-4 text-center lg:text-left">
            Educational Background🎓
          </h2>
        <div>
          <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-[#393042] after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                  <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">2018 - 2023</time>
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-200">Secondary & High School</div>
              </div>
              <div className="flex flex-col">
                <span className="text-[#313638] dark:text-[#e0e0e0] font-medium"><a href="https://psuwit.ac.th/">PSU.Wittayanusorn School</a></span>
                  <span className="text-[#525a5e] dark:text-[#b7bfc4]">Hat Yai, Thailand</span>
              </div>
          </div>
          <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-[#393042] after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                  <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">present</time>
                  <div className="text-xl font-bold text-slate-900 dark:text-slate-200">Bachelor's degree (current)</div>
              </div>
              <div className="flex flex-col">
                  <span className="text-[#313638] dark:text-[#e0e0e0] font-medium"><a href="https://kmutt.ac.th/">King Mongkut's University of Technology Thonburi</a></span>
                  <span className="text-[#525a5e] dark:text-[#b7bfc4]"><a href="https://www.cpe.kmutt.ac.th/en/">B.Eng, Computer Engineering</a></span>
                  <span className="text-[#525a5e] dark:text-[#b7bfc4]">Bangkok, Thailand</span>
              </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-x-8 pb-28 font-inter scroll-mt-12" id="skills">
          <h2 className="font-inter font-medium text-3xl mt-4 text-center lg:text-left">
            Skills⚙️
          </h2>
          <div className="flex flex-col gap-y-8 mt-10">
              {
                  dataMap.map(cur => (
                      <div key={cur.name} className="flex flex-col gap-y-4 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
                          <h3 className="text-2xl font-inter font-medium">{cur.displayName}</h3>
                          <div className="flex flex-wrap gap-y-8 gap-x-5 mx-auto lg:mx-0">
                              {stack[cur.name]?.map((ea) => (
                                  <div key={ea.name} className="w-20 h-20 flex flex-col gap-y-2 lg:gap-y-1 rounded-2xl" suppressHydrationWarning>
                                      <StackImageWithDark className="w-14 h-14 mx-auto" src={ea.image} srcDark={ea.image_dark || null} alt={ea.name} />
                                      <p className="font-inter text-center">{ea.name}</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))
              }
          </div>
      </section>
    </main>
  )
}
