const projectsContainer = document.getElementById("projects-container")
const loadingText = document.getElementById("project-loading")

const createProjectElement = (title, desc, link) => {
    const projectDiv = document.createElement("div")
    projectDiv.classList.add("project")
    
    const h = document.createElement("h3")
    h.innerText = title
    projectDiv.appendChild(h)

    const p = document.createElement("p")
    p.innerText = desc
    projectDiv.append(p)

    const a = document.createElement("a")
    a.innerText = "Check it out!"
    a.setAttribute("href", link)
    a.setAttribute("target", "_blank")
    a.setAttribute("rel", "noopener,noreferrer")
    projectDiv.appendChild(a)

    return projectDiv
}

const fetchProjects = async () => {
    const url = `https://minijakka-api.jakka.workers.dev/getprojects`
    let dataArray = []
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json()
        data['items'].forEach(x => {
            const { title, description, githubLink, projectLink } = x.fields
            const { createdAt } = x.sys
            const link = projectLink || githubLink
            const data = {
                title,
                description,
                link,
                date: createdAt,
            }
            dataArray.push(data)
        })
        dataArray.sort((a, b) => {
            return Date.parse(b.date) - Date.parse(a.date)
        })
        console.log(dataArray)

    } catch (error) {
        console.error('Failed to fetch projects:', error)
    }
    return dataArray
}

fetchProjects().then(data => {
    loadingText.remove()

    for (let i = 0; i < data.length; i++){
        const ea = data[i]
        const ele = createProjectElement(ea['title'], ea['description'], ea['link'])
        projectsContainer.appendChild(ele)
        if (i !== data.length - 1){
            const hr = document.createElement("hr")
            hr.style.borderTop = "1px solid #a5a5a5"
            hr.style.width = "100%"
            hr.style.marginTop = "1.5rem"
            hr.style.marginBottom = "1.5rem"
            hr.style.borderRadius = "1rem"
            hr.style.opacity = "25%"
            projectsContainer.append(hr)
        }
    }
})
