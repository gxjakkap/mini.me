import type { Metadata } from "next"

interface MetadataTemplateArguments {
    title: string,
    description: string,
    thumbnail?: string,
    addSiteNameInSocialTitle: boolean,
    isHome?: boolean
}

export const metadataTemplate = (argument: MetadataTemplateArguments): Metadata => {
    const socialTitle = (argument.addSiteNameInSocialTitle) ? `${argument.title} - jakka` : argument.title
    const socialDefaultImage = 'https://res.cloudinary.com/dynrld3nm/image/upload/f_auto,q_auto,w_300/guntxjakka.me/me_2024.jpg'
    return {
        title: (argument.isHome) ? "jakka" : `${argument.title} - jakka`,
        description: argument.description,
        authors: { name: "Jakkaphat Chalermphanaphan", url: "https://guntxjakka.me" },
        openGraph: {
            title: socialTitle,
            description: argument.description,
            type: "website",
            images: argument.thumbnail || socialDefaultImage,
            siteName: "jakka"
        },
        twitter: {
            card: "summary",
            title: socialTitle,
            description: argument.description,
            site: "@guntxjakka",
            images: argument.thumbnail || socialDefaultImage,
    
        }
    }
}
