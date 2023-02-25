import { NextApiHandler } from "next"

const handler: NextApiHandler = (req, res) => {
  const { method } = req
  switch (method) {
    case "GET":
      return res.json({ ok: true })
    default:
      res.status(404).send("not found")
  }
}

export default handler
