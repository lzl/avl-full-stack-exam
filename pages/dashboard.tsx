import { NextPage } from 'next'
import Link from 'next/link'
import { useMachine } from '@xstate/react'
import { Alert, Tabs } from 'antd'

import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'
import dashBoardMachine from '../machines/dashboard'

const Dashboard: NextPage = () => {
  const [current, send] = useMachine(dashBoardMachine, {
    devTools: process.env.NODE_ENV === 'development',
  })

  const { userInfo, error } = current.context

  function onLogin({ username, password }) {
    send({ type: 'LOG_IN', payload: { username, password } })
  }

  return (
    <Layout title="Restaurant List">
      {current.matches({ auth: 'loggedIn' }) ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '32px',
          }}
        >
          {userInfo && <div>Hi, {userInfo.username}</div>}
          <div>
            <Link href="/">
              <a>回到首页</a>
            </Link>
          </div>
        </div>
      ) : (
        <section>
          <div style={{ marginBottom: '1rem' }}>
            <Alert
              message="For demo, the username and password are 'admin'."
              type="info"
            />
          </div>
          {error && (
            <div style={{ marginBottom: '1rem' }}>
              <Alert message={error} type="error" />
            </div>
          )}
          <LoginForm
            onLogin={onLogin}
            isLoading={current.matches({ auth: { loggingIn: 'loading' } })}
          />
        </section>
      )}
    </Layout>
  )
}

export default Dashboard
