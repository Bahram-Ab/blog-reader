import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from "next"
import path from "path"
import fs from "fs"
import matter from "gray-matter"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const singleBlogPage: NextPage<Props> = ({ blog }) => {
  const { content, title } = blog
  return (
    <div className="prose lg:prose-xl mx-auto py-10">
      <h1 className="text-2xl border-b-4 border-stone-500 pb-5">{title}</h1>
      <MDXRemote {...content} />
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
    fallback: "blocking"
  }
}

type Blog = {
  blog: {
    content: MDXRemoteSerializeResult
    title: string
  }
}

export const getStaticProps: GetStaticProps<Blog> = async (context) => {
  const { params } = context
  const { blogSlug } = params!
  const filePathToRead = path.join(process.cwd(), "posts/" + blogSlug + ".md")
  const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" })
  const source: any = await serialize(fileContent, { parseFrontmatter: true })
  return {
    props: {
      blog: {
        content: source,
        title: source.frontmatter.title
      }
    }
  }
}
