export const fetcher = (...args) => fetch(...args).then(res => res.json())

export const guntxFetching = (endpoint) => {
    let apiOrigin = "https://guntxjakka.me"
    if (process.env.NODE_ENV == "development"){
        apiOrigin = window.location.origin
        console.log(window.location.origin)
    }
    return fetch(`${apiOrigin}/api/${endpoint}`)
        .then(res => res.json())
}