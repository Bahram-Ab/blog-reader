import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { postApiResponse } from "./types"

export const readPostsInfo = (): postApiResponse[] => {
  const dirPathToRead = path.join(process.cwd(), "posts")
  const dirs = fs.readdirSync(dirPathToRead)
  const data = dirs.map((fileName) => {
    const filePathToRead = path.join(process.cwd(), "posts/" + fileName)
    const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" })
    return matter(fileContent).data
  })
  return data as any
}
