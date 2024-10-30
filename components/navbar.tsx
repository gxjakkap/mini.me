'use client'

import { useState, useEffect, useRef, MutableRefObject } from "react"
import { Bars3Icon, XMarkIcon, ChevronDownIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

type CurState = "home" | "more" | "edu" | "proj" | "skills" | "blog" | "contact" | null

export default function Navbar(){
    const [cur, setCur] = useState<CurState>(null)
    const pathName = usePathname()

    useEffect(() => {
        if (["edu", "more", "skills"].includes(cur || "")) return

        if (pathName.startsWith("/#education")) setCur("edu")
        else if (pathName.startsWith("/#more")) setCur("more")
        else if (pathName.startsWith("/project")) setCur("proj")
        else if (pathName.startsWith("/#skills")) setCur("skills")
        else if (pathName.startsWith("/blog")) setCur("blog")
        else if (pathName.startsWith("/contact")) setCur("contact")
        else if (pathName === "/") setCur("home")
        else setCur(null)
    }, [pathName, cur])

    const Links = ({ cur, menuRef }: {cur: string | null, menuRef: MutableRefObject<HTMLInputElement | null>}) => {
        const closeMenu = () => {(menuRef as MutableRefObject<HTMLInputElement>).current.checked = false}
        const linkClickAction = (path: CurState) => {closeMenu();setCur(path)}
        return (
            <>
                <li><Link className={`text-[#313638] dark:text-[#e0e0e0] ${cur === "home" ? "underline decoration-1 underline-offset-4" : ""}`} href="/#main" onClick={() => linkClickAction('home')}>Home</Link></li>
                <li><Link className={`text-[#313638] dark:text-[#e0e0e0] ${cur === "more" ? "underline decoration-1 underline-offset-4" : ""}`} href="/#more" onClick={() => linkClickAction('more')}>About</Link></li>
                <li><Link className={`text-[#313638] dark:text-[#e0e0e0] ${cur === "edu" ? "underline decoration-1 underline-offset-4" : ""}`} href="/#education" onClick={() => linkClickAction('edu')}>Education</Link></li>
                <li><Link className={`text-[#313638] dark:text-[#e0e0e0] ${cur === "skills" ? "underline decoration-1 underline-offset-4" : ""}`} href="/#skills" onClick={() => linkClickAction('skills')}>Skills</Link></li>
                <li><Link className={`text-[#313638] dark:text-[#e0e0e0] ${cur === "proj" ? "underline decoration-1 underline-offset-4" : ""}`} href="/project" onClick={() => linkClickAction('proj')}>Projects</Link></li>
                <li><Link className={`text-[#313638] dark:text-[#e0e0e0] ${cur === "blog" ? "underline decoration-1 underline-offset-4" : ""}`} href="/blog" onClick={() => linkClickAction('blog')}>Blog</Link></li>
                <li><Link className={`text-[#313638] dark:text-[#e0e0e0] ${cur === "contact" ? "underline decoration-1 underline-offset-4" : ""}`} href="/contact" onClick={() => linkClickAction('contact')}>Contact</Link></li>
            </>
        )
    }

    const mobileMenuRef = useRef(null)

    const { theme, setTheme } = useTheme()

    const themeToggle = () => {
        if (theme === 'light'){
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }

    return (
        <>
            <header className="fixed z-50 flex w-full bg-[#f2f2f2] pl-[85%] pt-6 text-[#313638] dark:bg-[#1a1a1a] dark:text-[#e0e0e0] md:hidden">
                <label className="relative z-40 cursor-pointer" htmlFor="mobile-menu">
                    <input className="peer hidden" type="checkbox" id="mobile-menu" ref={mobileMenuRef} />
                    <Bars3Icon className="size-8 text-[#313638] dark:text-[#e0e0e0]" />
                    <div className="fixed inset-0 z-40 hidden size-full bg-black/50 backdrop-blur-sm peer-checked:block">
                        &nbsp;
                    </div>
                    <div className="fixed right-0 top-0 z-40 size-full translate-x-full overflow-y-auto overscroll-y-none transition duration-500 peer-checked:translate-x-0">
                        <div className="float-right min-h-full w-[85%] bg-[#f2f2f2] px-6 pt-12 font-inter shadow-2xl dark:bg-[#1a1a1a]">
                            <XMarkIcon className="ml-auto size-8 text-[#313638] dark:text-[#e0e0e0]" />
                            <div className="text-center text-lg font-bold">jakka</div>
                            <div className="font-bold">Pages</div>
                            <menu>
                                <Links cur={cur} menuRef={mobileMenuRef} />
                            </menu>
                            <div className="mt-10 font-bold">ETC</div>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            <Link className="text-[#313638] dark:text-[#e0e0e0]" href="/etc/heavyrotation" onClick={() => {(mobileMenuRef as any).current.checked = false}}>Heavy Rotation</Link>
                            <div className="mt-32" onClick={themeToggle}>
                                {(theme === 'light') && <MoonIcon className="w-8 text-[#313638]" />}
                                {(theme === 'dark') && <SunIcon className="w-8 text-[#e0e0e0]" />}
                            </div>
                        </div>
                    </div>
                </label>

            </header>
            <header className="fixed z-50 hidden w-full bg-[#f2f2f2] pb-3 pt-6 text-[#313638] dark:bg-[#1a1a1a] dark:text-[#e0e0e0] md:flex">
                <div className="ml-auto mr-[10%] flex">
                    <ul className="flex list-none gap-x-5 font-inter text-base lg:text-[1rem]">
                        <Links cur={cur} menuRef={mobileMenuRef} />
                        <div className="group relative break-keep font-inter">
                            <p className="flex gap-x-1 text-[#313638] dark:text-[#e0e0e0]">ETC <ChevronDownIcon className="w-4 text-[#313638] dark:text-[#e0e0e0]" /></p>
                            <div className="absolute z-10 hidden p-2 group-hover:flex">
                                <ul>
                                    <li><Link href='/etc/heavyrotation'><div className="flex gap-x-1 text-[#313638] dark:text-[#e0e0e0]"><span>Heavy</span><span>Rotation</span></div></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="cursor-pointer" onClick={themeToggle}>
                            {(theme === 'light') && <MoonIcon className="w-6 text-[#313638]" />}
                            {(theme === 'dark') && <SunIcon className="w-6 text-[#e0e0e0]" />}
                        </div>
                    </ul>
                </div>
            </header>
        </>
    )
}