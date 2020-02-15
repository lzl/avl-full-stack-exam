import React from 'react'
import useSWR from 'swr'
import { Table } from 'antd'

import fetcher from '../utils/fetcher'

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function parseDate(date: Date) {
  const tzDate = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Taipei' })
  )
  const day = tzDate.getDay()
  const hour = tzDate.getHours()
  const minute = tzDate.getMinutes()
  const preDay = day === 0 ? dayNames.length - 1 : day - 1
  const isMidnight = hour < 6
  const dayName = isMidnight ? dayNames[preDay] : dayNames[day]

  return {
    dayName,
    hour,
    minute,
  }
}

function filterByDateTime(data, date: Date) {
  const { dayName, hour, minute } = parseDate(date)

  const dateTime = data[dayName]
  if (dateTime === 'Closed') return false
  const [startTime, endTime] = dateTime.split('-')
  const [startHour, startMinute] = startTime.split(':')
  const [endHour, endMinute] = endTime.split(':')
  const startTimeNumber = Number(startHour) * 60 + Number(startMinute)
  const endTimeNumber = Number(endHour) * 60 + Number(endMinute)

  const timeNumber = hour * 60 + minute

  if (startTimeNumber < endTimeNumber) {
    return startTimeNumber < timeNumber && timeNumber < endTimeNumber
  } else {
    return startTimeNumber < timeNumber || timeNumber < endTimeNumber
  }
}

function getNameAndTime(data, index) {
  return { key: index, ...data }
}

function RestaurantTable({ date }: { date?: Date }) {
  const { data, error } = useSWR('/api/data', fetcher)

  if (error) return <div>failed to load</div>

  let columns = [
    {
      title: '名称',
      dataIndex: 'Name',
      key: 'name',
      width: 100,
      fixed: true,
    },
    {
      title: '周日',
      dataIndex: 'Sun',
      key: 'sun',
    },
    {
      title: '周一',
      dataIndex: 'Mon',
      key: 'mon',
    },
    {
      title: '周二',
      dataIndex: 'Tue',
      key: 'tue',
    },
    {
      title: '周三',
      dataIndex: 'Wed',
      key: 'wed',
    },
    {
      title: '周四',
      dataIndex: 'Thu',
      key: 'thu',
    },
    {
      title: '周五',
      dataIndex: 'Fri',
      key: 'fri',
    },
    {
      title: '周六',
      dataIndex: 'Sat',
      key: 'sat',
    },
  ]

  if (!date) {
    columns = [
      ...columns,
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        // render: () => <a>删除</a>, // maybe there is a bug at antd lib, it doesn't allow render.
      },
    ]
  }

  if (!data) return <Table columns={columns} loading={true} />

  let filteredData = []

  if (date) {
    filteredData = data
      .filter(data => filterByDateTime(data, date))
      .map((data, index) => getNameAndTime(data, index))
  } else {
    filteredData = data.map((data, index) => getNameAndTime(data, index))
  }

  return (
    <div>
      <div style={{ margin: '1rem', fontSize: '16px', fontWeight: 'bold' }}>
        {date ? '正在营业的餐厅（当前时间 / 您选择的时间）' : '所有餐厅数据'}
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={false}
        bordered={true}
        scroll={{ x: 1000, y: 600 }}
      />
    </div>
  )
}

export default RestaurantTable
