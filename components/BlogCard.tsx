import Link from "next/link"
import { FC } from "react"

interface Props {
  title: string
  desc: string
  slug: string
}

const BlogCard: FC<Props> = ({ title, desc, slug }): JSX.Element => {
  return (
    <Link href={"/blog/" + slug} className="block">
      <div className="bg-green-100 rounded p-2 cursor-pointer">
        <h1 className="text-grey-900 text-3xl font-semibold">{title}</h1>
        <p className="text-gray-500">{desc}</p>
      </div>
    </Link>
  )
}

export default BlogCard
