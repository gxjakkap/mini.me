export const localeDateString = (date: string) => {
    let epdate = new Date(date)
    return epdate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit"
    })
}