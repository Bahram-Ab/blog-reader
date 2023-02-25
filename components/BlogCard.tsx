import { FC } from "react"

interface Props {
  title: string
  desc: string
}

const BlogCard: FC<Props> = ({ title, desc }): JSX.Element => {
  return (
    <div className="bg-green-100 rounded p-2">
      <h1 className="text-grey-900 text-3xl font-semibold">{title}</h1>
      <p className="text-gray-500">{desc}</p>
    </div>
  )
}

export default BlogCard
