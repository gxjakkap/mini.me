const createSkillsContainer = (skillsName, data, mainContainer) => {
    const currentSkillsContainer = document.createElement("div")
    const tilesContainer = document.createElement("div")
    currentSkillsContainer.classList.add("skills-container")
    tilesContainer.classList.add("skills-tiles-container")
    data.forEach(ea => {
        const tile = document.createElement("div")
        const imgNode = document.createElement("img")
        const textNode = document.createElement("p")
        imgNode.setAttribute("src", ea['image'])
        textNode.innerText = `${ea['name']}`
        tile.classList.add("skills-tile")
        tile.appendChild(imgNode)
        tile.appendChild(textNode)

        tilesContainer.appendChild(tile)
    })
    const currentTitle = document.createElement("h3")
    currentTitle.innerText = `${skillsName}`
    currentSkillsContainer.appendChild(currentTitle)
    currentSkillsContainer.appendChild(tilesContainer)

    mainContainer.appendChild(currentSkillsContainer)
}

fetch('/assets/json/stack.json').then(async (res) => {
    const data = await res.json()

    const dataMap = [{name: 'front', displayName: 'Frontend'}, {name: 'back', displayName: 'Backend'}, {name: 'tools', displayName: 'Tools'}]
    const mainContainer = document.getElementById("skills-content")
    dataMap.forEach(ea => {
        createSkillsContainer(ea.displayName, data[`${ea.name}`], mainContainer)
    })
})
