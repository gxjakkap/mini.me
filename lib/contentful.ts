import 'dotenv/config'
import readingTime from 'reading-time'
import { createClient, CreateClientParams, RichTextContent } from 'contentful'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

export interface AllBlogData {
    title: string,
    metaDesc: string,
    socialImage: string,
    date: string,
    tags: string[],
    slug: string
}

export interface AllProjectData {
    title: string,
    description: string,
    thumbnail: string,
    tags: string[],
    date: string,
    slug: string
}

export interface BlogData {
    error: boolean,
    errorCode?: number,
    errorMsg?: string,
    frontMatter?: {
        title: string,
        metaDesc: string,
        socialImage: string,
        date: string,
        tags: string[]
    },
    content?: RichTextContent,
    readTime?: string
}

export interface ProjectData {
    error: boolean,
    errorCode?: number
    errorMsg?: string,
    data?: {
        title: string,
        description: string,
        thumbnail: string,
        githubLink: string | null,
        projectLink: string | null,
        tags: string,
        content: RichTextContent,
        stack: {
            name: string,
            image: string
        }[] | null
    }
}

const config: CreateClientParams = {
    space: process.env.CONTENTFUL_SPACE || "",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
    environment: 'master'
}

const client = createClient(config)

export async function getPostData(slug: string): Promise<BlogData> {
    const res = await client.getEntries({
        'fields.slug': slug,
        content_type: 'blogPost'
    })

    if (res.items.length < 1){
        return {
            error: true,
            errorCode: 404,
            errorMsg: "Not Found"
        }
    }

    const { name, description, imageLink, date, tags, content } = res.items[0].fields as any

    const data = {
        title: name,
        metaDesc: description,
        socialImage: imageLink,
        date: date,
        tags: tags
    }

    const stats = readingTime(documentToPlainTextString(content))
    
    return {
        error: false,
        frontMatter: data,
        content: content,
        readTime: stats.text
    }
}

export const getAllBlogInfo = async () => {
    const res = await client.getEntries({
        content_type: 'blogPost'
    })

    let dataArray: AllBlogData[] = []

    res.items.forEach(post => {
        const { name, slug, description, imageLink, date, tags } = post.fields as any
        const data = {
            title: name,
            metaDesc: description,
            socialImage: imageLink,
            date: date,
            tags: tags,
            slug: slug
        }
        dataArray.push(data)
    })

    dataArray.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date)
    })

    return dataArray
}

export const getLatestBlog = async () => {
    const res = await client.getEntries({
        content_type: 'blogPost'
    })

    let dataArray: AllBlogData[] = []

    res.items.forEach(post => {
        const { name, slug, description, imageLink, date, tags } = post.fields as any
        const data = {
            title: name,
            metaDesc: description,
            socialImage: imageLink,
            date: date,
            tags: tags,
            slug: slug
        }
        dataArray.push(data)
    })

    dataArray.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date)
    })

    return dataArray[0]
}

export const getProjectData = async (slug: string): Promise<ProjectData> => {
    const res = await client.getEntries({
        'fields.slug': slug,
        content_type: 'projects'
    })

    if (res.items.length < 1){
        return {
            error: true,
            errorCode: 404,
            errorMsg: "Not Found"
        }
    }

    const { title, description, thumbnail, projectLink, githubLink, tags, content, stack } = res.items[0].fields as any

    const data = {
        title,
        description,
        thumbnail,
        githubLink: githubLink || null,
        projectLink: projectLink || null,
        tags,
        content: content,
        stack: stack || null
    }
    
    return {
        error: false,
        data
    }
}

export const getAllProjects = async () => {
    const res = await client.getEntries({
        content_type: 'projects'
    })

    let dataArray: AllProjectData[] = []

    res.items.forEach(prj => {
        const { title, description, thumbnail, tags, slug } = prj.fields as any
        const { createdAt } = prj.sys
        const data = {
            title,
            description,
            thumbnail,
            tags,
            date: createdAt,
            slug
        }
        dataArray.push(data)
    })

    dataArray.sort((a, b) => {
        return Date.parse(b.date) - Date.parse(a.date)
    })

    return dataArray
}