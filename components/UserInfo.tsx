import React from 'react'
import { Avatar } from 'antd'

function UserInfo({ user }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={user.picture} />
      <div style={{ marginLeft: '10px' }}>{user.email}</div>
    </div>
  )
}

export default UserInfo
