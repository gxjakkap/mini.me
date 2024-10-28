import { Inter, Prompt } from 'next/font/google'
import { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

import Navbar from "@/components/navbar"
import SiteFooter from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: "--font-inter" })
const promptReg = Prompt({ subsets: ['thai'], display: 'swap', weight: '400', variable: "--font-prompt-regular" })
const promptMed = Prompt({ subsets: ['thai'], display: 'swap', weight: '500', variable: "--font-prompt-medium" })

export const metadata: Metadata = {
    authors: { name: "Jakkaphat Chalermphanaphan", url: "https://guntxjakka.me" },
    keywords: ["guntxjakka", "jakkaphat chalermphanaphan", "jakkaphat, chalermphanaphan", "gunt", "gxjakkap"]
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <link href="https://mastodon.social/@jakka" rel="me" />
        <ThemeProvider attribute="class" enableSystem={false} >
            <body suppressHydrationWarning className={`${inter.variable} ${promptReg.variable} ${promptMed.variable} antialiased flex flex-col flex-grow bg-[#f2f2f2] dark:bg-[#1a1a1a] min-h-screen`}>
                <Navbar />
                    <div className="mt-12 lg:mt-0 flex flex-col flex-grow flex-1">
                        {children} 
                    </div>
                <SiteFooter />
            </body>
        </ThemeProvider>
    </html>
  );
}
