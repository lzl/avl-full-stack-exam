import React from 'react'
import useSWR from 'swr'
import { Button } from 'antd'

import fetcher from '../utils/fetcher'

function LoginButton() {
  const { data, error } = useSWR('/api/oauth/google', fetcher)

  if (error) return <div>failed to load</div>

  if (data) {
    return (
      <a href={data.url}>
        <Button type="link">使用 Google 账号登录</Button>
      </a>
    )
  } else {
    return (
      <Button type="link" disabled={true}>
        使用 Google 账号登录
      </Button>
    )
  }
}

export default LoginButton
