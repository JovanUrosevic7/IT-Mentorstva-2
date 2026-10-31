import fs from "fs"
import path from "path"


const filePath = path.join(process.cwd(), "data", "links.json")

export function getLinks() {

    if(!fs.existsSync(filePath)){
        return []
    }

    const fileData = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileData) 

}

export function saveLinks(links){
    
    const dir = path.dirname(filePath)

    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir, {recursive: true})
    }

    fs.writeFileSync(filePath, JSON.stringify(links, null, 2))
}
