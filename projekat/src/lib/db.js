import fs from "fs"
import path from "path"


const pathFile = path.join(process.cwd(), "data", "links.json")

export function getLinka() {

    if(!fs.existsSync(pathFile)){
        return []
    }

    const fileData = fs.readFileSync(pathFile, "utf8")
    return JSON.parse(fileData) 

}

export function saveLinks(pathFile){
    const dir = path.dirname(filePath)
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive: true})
    }

    fs.writeFileSync(filePath, JSON.stringify(links, null, 2))
}
