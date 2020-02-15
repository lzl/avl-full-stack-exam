import { google } from 'googleapis'
import db from '../_db'

const isDev = process.env.NODE_ENV === 'development'

const googleConfig = {
  clientId:
    '454270118201-1f8r5ifmo5rudmdrb2ch887c99962d7u.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirect: isDev
    ? 'http://localhost:3000/login/google'
    : 'https://avl-full-stack-exam.lzl.now.sh/login/google',
}

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
]

function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  )
}

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    // prompt: 'consent',
    scope: defaultScope,
  })
}

function getGooglePeopleApi(auth) {
  return google.people({ version: 'v1', auth })
}

function urlGoogle() {
  const auth = createConnection()
  const url = getConnectionUrl(auth)
  return url
}

async function getGoogleProfileFromCode(code) {
  const auth = createConnection()
  const { tokens } = await auth.getToken(code)
  auth.setCredentials(tokens)
  const people = getGooglePeopleApi(auth)
  const me = await people.people.get({
    resourceName: 'people/me',
    personFields: 'emailAddresses,names,photos',
  })
  return { tokens, me }
}

export default async (req, res) => {
  try {
    const { code } = req.query
    if (code) {
      const result = await getGoogleProfileFromCode(code)

      const email = result.me.data.emailAddresses[0].value
      const foundUser = await db('users').where({ email })
      console.log('foundUser:', foundUser)
      if (foundUser.length > 0) {
        await db('users')
          .where({ email })
          .update({
            avatar_url: result.me.data.photos[0].url,
            google_access_token: result.tokens.access_token,
            google_id_token: result.tokens.id_token,
            google_expiry_date: result.tokens.expiry_date,
          })
      } else {
        await db('users').insert({
          email,
          avatar_url: result.me.data.photos[0].url,
          google_refresh_token: result.tokens.refresh_token,
          google_access_token: result.tokens.access_token,
          google_id_token: result.tokens.id_token,
          google_expiry_date: result.tokens.expiry_date,
        })
      }

      const google_id_token = result.tokens.id_token
      res.status(200).json({ google_id_token })
    } else {
      const url = urlGoogle()
      res.status(200).json({ url })
    }
  } catch (err) {
    res.status(404).json({ statusCode: 404, message: err.message })
  }
}
