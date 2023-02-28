import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from "next"
import path from "path"
import fs from "fs"
import matter from "gray-matter"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const singleBlogPage: NextPage<Props> = (props) => {
  return (
    <div>
      <div>{props.blog.title}</div>
      <div>{props.blog.content}</div>
    </div>
  )
}

export default singleBlogPage

export const getStaticPaths: GetStaticPaths = () => {
  const dirPathToRead = path.join(process.cwd(), "posts")
  const dirs = fs.readdirSync(dirPathToRead)
  const paths = dirs.map((fileName) => {
    const filePathToRead = path.join(process.cwd(), "posts/" + fileName)
    const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" })
    return { params: { blogSlug: matter(fileContent).data.slug } }
  })
  return {
    paths,
    fallback: false
  }
}

type Blog = {
  blog: {
    content: string
    title: string
  }
}

export const getStaticProps: GetStaticProps<Blog> = (context) => {
  const { params } = context
  const { blogSlug } = params!
  const filePathToRead = path.join(process.cwd(), "posts/" + blogSlug + ".md")
  const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" })
  const { content, data } = matter(fileContent)

  return {
    props: {
      blog: {
        content,
        title: data.title
      }
    }
  }
}
