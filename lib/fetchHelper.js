export const fetcher = (...args) => fetch(...args).then(res => res.json())

export const guntxFetching = (endpoint) => {
    let apiOrigin = process.env.NEXT_PUBLIC_VERCEL_URL || "https://guntxjakka.me"
    if (process.env.NODE_ENV == "development"){
        apiOrigin = window.location.origin
        console.log(window.location.origin)
    }
    return fetch(`https://${apiOrigin}/api/${endpoint}`)
        .then(res => res.json())
}