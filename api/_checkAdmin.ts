import { NextApiRequest } from 'next'
import parseBearerToken from 'parse-bearer-token'
import jwt from 'jsonwebtoken'

export default (req: NextApiRequest) => {
  const token = parseBearerToken(req)
  if (!token) {
    throw new Error('missing admin token')
  }

  const decoded = jwt.verify(token, 'secret_change_later')
  // console.log('decoded:', decoded)
  return decoded.username === 'admin'
}
