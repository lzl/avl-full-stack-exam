import { NextApiRequest, NextApiResponse } from 'next'
import checkAdmin from './_checkAdmin'
import db from './_db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const isAdmin = checkAdmin(req)
    if (!isAdmin) {
      throw new Error('have no permission')
    }
    // console.log('body:', req.body)
    await db('restaurants').insert(req.body) // todo 后端验证开始时间小于结束时间
    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}
