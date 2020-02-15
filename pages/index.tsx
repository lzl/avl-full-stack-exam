import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import jwtDecode from 'jwt-decode'

import Layout from '../components/Layout'
import RestaurantTable from '../components/RestaurantTable'
import DateTimeForm from '../components/DateTimeForm'
import GoogleLoginButton from '../components/GoogleLoginButton'
import UserInfo from '../components/UserInfo'

const IndexPage: NextPage = () => {
  const [date, setDate] = useState(new Date())
  const [user, setUser] = useState()

  useEffect(() => {
    const token = localStorage.getItem('google_id_token')
    if (token) {
      const user = jwtDecode(token)
      // console.log("user:", user);
      setUser(user)
    }
  }, [])

  return (
    <Layout title="餐厅列表">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {user ? <UserInfo user={user} /> : <GoogleLoginButton />}
        <Link href="/dashboard">
          <a>后台管理</a>
        </Link>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <DateTimeForm setDate={setDate} />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <RestaurantTable date={date} />
      </div>
    </Layout>
  )
}

export default IndexPage
