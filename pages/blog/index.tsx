import BlogCard from "@/components/BlogCard"
import { readPostsInfo } from "@/utils/helpers"
import { postApiResponse } from "@/utils/types"
import { InferGetStaticPropsType, NextPage } from "next"

export const getStaticProps = async () => {
  const data: postApiResponse[] = await readPostsInfo()

  return {
    props: { posts: data }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Blog: NextPage<Props> = ({ posts }) => {
  return (
    <div className="mx-auto p-5 max-w-3xl space-y-5">
      {posts.map(({ title, meta, slug }) => {
        return <BlogCard key={slug} title={title} desc={meta} slug={slug} />
      })}
    </div>
  )
}

export default Blog
