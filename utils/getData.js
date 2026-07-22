import fs from 'node:fs/promises'
import path from 'node:path'

export async function getDataEn() {

  try { 
    const pathJSON = path.join('data', 'data-en.json')
    const data = await fs.readFile(pathJSON, 'utf8')
    const parsedData = JSON.parse(data)
    return parsedData

  } catch(err) {
    console.log(err)
    return []
  }
}

export async function getDataAr() {

  try { 
    const pathJSON = path.join('data', 'data-ar.json')
    const data = await fs.readFile(pathJSON, 'utf8')
    const parsedData = JSON.parse(data)
    return parsedData

  } catch(err) {
    console.log(err)
    return []
  }
}