import { NextApiRequest, NextApiResponse } from 'next'
import db from './_db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const hasUsersTable = await db.schema.hasTable('users')
    if (!hasUsersTable) {
      await db.schema.createTable('users', t => {
        t.increments('id').primary()
        t.string('username')
        t.string('password')
        t.string('email')
        t.text('avatar_url')
        t.text('google_refresh_token')
        t.text('google_access_token')
        t.text('google_id_token')
        t.bigInteger('google_expiry_date')
        t.timestamp('created_at').defaultTo(db.fn.now())
      })
    }
    res.status(200).json({ ok: true })
  } catch (err) {
    console.log('init db err:', err)
    res.status(404).json(err)
  }
}
