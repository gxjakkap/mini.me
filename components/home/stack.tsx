'use client'

import { useTheme } from "next-themes"

interface StackImageWithDarkProps {
    className: string,
    src: string,
    srcDark: string | null,
    alt: string
}

interface EachStackData {
    image: string,
    image_dark: string | null,
    name: string,
    xp: number
}

interface StackData {
    front: EachStackData[],
    back: EachStackData[],
    tools: EachStackData[]
}

type SkillCategory = 'front' | 'back' | 'tools'

export const StackImageWithDark = ({ className, src, srcDark, alt }: StackImageWithDarkProps) => {
    const { theme } = useTheme()
    if (theme === "dark" && srcDark) return <img className={className} src={srcDark} alt={alt} />
    else return <img className={className} src={src} alt={alt} />
}

const dataMap: { name: SkillCategory; displayName: string }[] = [{name: 'front', displayName: 'Frontend'}, {name: 'back', displayName: 'Backend'}, {name: 'tools', displayName: 'Tools / Other languages'}]

export const Skills = ({ data: stack }: { data: StackData }) => {
    return (
        <section className="flex scroll-mt-12 flex-col gap-x-8 pb-28 font-inter xl:mt-48 xl:pb-48" id="skills">
          <h2 className="mt-4 text-center font-inter text-3xl font-medium lg:text-left">
            Skills⚙️
          </h2>
          <div className="mt-10 flex flex-col gap-y-8">
              {
                dataMap.map(cur => (
                    <div key={cur.name} className="flex max-w-screen-sm flex-col gap-y-4 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl">
                        <h3 className="font-inter text-2xl font-medium">{cur.displayName}</h3>
                        <div className="mx-auto flex flex-wrap gap-x-5 gap-y-8 lg:mx-0">
                            {stack[cur.name]?.map((ea) => (
                                <div key={ea.name} className="flex size-20 flex-col gap-y-2 rounded-2xl lg:gap-y-1" suppressHydrationWarning>
                                    <StackImageWithDark className="mx-auto size-14" src={ea.image} srcDark={ea.image_dark || null} alt={ea.name} />
                                    <p className="text-center font-inter">{ea.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
              }
          </div>
      </section>
    )
}