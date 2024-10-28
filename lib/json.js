import fsPromises from 'fs/promises'

export async function fetchJSON(filePath){
    const jsonData = await fsPromises.readFile(filePath)
    const objectData = JSON.parse(jsonData)
    return objectData
}