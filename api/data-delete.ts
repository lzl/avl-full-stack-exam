import { NextApiRequest, NextApiResponse } from 'next'
import checkAdmin from './_checkAdmin'
import db from './_db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const isAdmin = checkAdmin(req)
    if (!isAdmin) {
      throw new Error('have no permission')
    }
    const { id } = req.body
    await db('restaurants')
      .where({ id })
      .del()
    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}
