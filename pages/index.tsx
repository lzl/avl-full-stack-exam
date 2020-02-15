import React, { useState } from 'react'
import { NextPage } from 'next'

import Layout from '../components/Layout'
import RestaurantTable from '../components/RestaurantTable'

const IndexPage: NextPage = () => {
  const [date, setDate] = useState(new Date())

  return (
    <Layout title="餐厅列表">
      <RestaurantTable date={date} />
    </Layout>
  )
}

export default IndexPage
