import 'dotenv/config'
import readingTime from 'reading-time'
import { createClient } from 'contentful'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

const config = {
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    environment: 'master'
}

const client = createClient(config)

export const getPostData = async (slug) => {
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

    const { name, description, imageLink, date, tags, content } = res.items[0].fields

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

    let dataArray = []

    res.items.forEach(post => {
        const { name, slug, description, imageLink, date, tags } = post.fields
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

    let dataArray = []

    res.items.forEach(post => {
        const { name, slug, description, imageLink, date, tags } = post.fields
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

export const getProjectData = async (slug) => {
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

    const { title, description, thumbnail, projectLink, githubLink, tags, content, stack } = res.items[0].fields

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

    let dataArray = []

    res.items.forEach(prj => {
        const { title, description, thumbnail, tags, slug } = prj.fields
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