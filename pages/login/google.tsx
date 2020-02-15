import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import fetcher from '../../utils/fetcher'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const { code } = router.query

  const { data, error } = useSWR(
    code ? `/api/oauth/google?code=${code}` : null,
    fetcher,
    { revalidateOnFocus: false }
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading</div>

  if (data.google_id_token) {
    localStorage.setItem('google_id_token', data.google_id_token)
    router.push('/')
  }

  return null
}

export default LoginPage
