import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from './_db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { username, password } = req.body
    const findUser = await db('users').where({ username })
    // console.log('findUser:', findUser)
    if (findUser.length === 0) {
      throw new Error('The username or password is not correct.')
    }
    const hashedPassword = findUser[0].password
    const isAuth = await bcrypt.compare(password, hashedPassword)
    if (!isAuth) {
      throw new Error('The username or password is not correct.')
    }

    const token = jwt.sign({ username }, 'secret_change_later')
    res.status(200).json({ token })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}
