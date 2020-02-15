import React from 'react'
import { Form, Button, DatePicker, TimePicker } from 'antd'
import moment from 'moment'

function DateTimeForm({ setDate }) {
  const [form] = Form.useForm()

  function onFinish({ date, time }) {
    const selectedDate = moment(date).format('YYYY-MM-DD')
    const selectedTime = moment(time).format('HH:mm')
    const selectedDateTime = moment(`${selectedDate} ${selectedTime}`).toDate()
    setDate(selectedDateTime)
  }

  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="date" label="日期" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="time" label="时间" rules={[{ required: true }]}>
        <TimePicker format={'HH:mm'} minuteStep={10} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
      </Form.Item>
    </Form>
  )
}

export default DateTimeForm
