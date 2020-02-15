import React, { useState } from 'react'
import { NextPage } from 'next'

import Layout from '../components/Layout'
import RestaurantTable from '../components/RestaurantTable'
import DateTimeForm from '../components/DateTimeForm'

const IndexPage: NextPage = () => {
  const [date, setDate] = useState(new Date())

  return (
    <Layout title="餐厅列表">
      <DateTimeForm setDate={setDate} />
      <div style={{ marginTop: '1rem' }}>
        <RestaurantTable date={date} />
      </div>
    </Layout>
  )
}

export default IndexPage
