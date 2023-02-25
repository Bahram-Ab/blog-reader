import BlogCard from "@/components/BlogCard"
import { NextPage } from "next"

const Blog: NextPage = () => {
  return (
    <div className="mx-auto p-5 max-w-3xl space-y-5">
      <BlogCard
        title="this is my title"
        desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sapiente consequuntur laudantium amet veritatis! Quisquam esse eius numquam quod beatae!"
      />
    </div>
  )
}

export default Blog
