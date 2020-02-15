import { NextApiRequest, NextApiResponse } from 'next'
import db from './_db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await db.select().table('restaurants')
    res.status(200).json(data)
  } catch (err) {
    console.log(err.stack)
    res.status(404).json(err.stack)
  }
}
