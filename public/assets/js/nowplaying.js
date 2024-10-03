const getSpotifyNowPlaying = async() => {
    const res = await fetch("https://guntxjakka.me/api/listeningto")
    if (res.status !== 200) return null
    const data = await res.json()

    return data
}

getSpotifyNowPlaying().then(data => {
    console.log(data)
    if (data['title'] !== ""){
        console.log("pass")
        const nowPlayingElement = document.getElementById("nowplaying")

        const npText = document.createElement("a")
        npText.innerText = `listening to ${data['title']} by ${data['artist']}`
        npText.setAttribute("href", `${data['song_url']}`)
        npText.setAttribute("rel", "noopener,noreferrer")
        npText.setAttribute("target", "_blank")

        nowPlayingElement.appendChild(npText)
        nowPlayingElement.style.display = "inline";
    }
})