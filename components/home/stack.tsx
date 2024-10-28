'use client'

import { useTheme } from "next-themes"

interface StackImageWithDarkProps {
    className: string,
    src: string,
    srcDark: string | null,
    alt: string
}

export const StackImageWithDark = ({ className, src, srcDark, alt }: StackImageWithDarkProps) => {
    const { theme } = useTheme()
    if (theme === "dark" && srcDark) return <img className={className} src={srcDark} alt={alt} />
    else return <img className={className} src={src} alt={alt} />
}