import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from './_db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, password } = req.body

    const findUser = await db('users').where({ username })
    if (findUser.length > 0) {
      throw new Error('username existed')
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    await db('users').insert({ username, password: hashedPassword })

    const token = jwt.sign({ username }, 'secret_change_later')
    res.status(200).json({ token })
  } catch (error) {
    res.status(404).json({ error })
  }
}