import BlogCard from "@/components/BlogCard"
import { InferGetStaticPropsType, NextPage } from "next"

interface postApiResponse {
  title: string
  meta: string
  slug: string
}

export const getStaticProps = async () => {
  const data: postApiResponse[] = await fetch("http://localhost:3000/api/posts")
    .then((res) => res.json())
    .then((res) => res.postInfo)

  return {
    props: { posts: data }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Blog: NextPage<Props> = ({ posts }) => {
  return (
    <div className="mx-auto p-5 max-w-3xl space-y-5">
      {posts.map(({ title, meta, slug }) => {
        return <BlogCard key={slug} title={title} desc={meta} />
      })}
    </div>
  )
}

export default Blog
