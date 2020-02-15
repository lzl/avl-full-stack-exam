import { useState } from 'react'
import useSWR, { mutate, trigger } from 'swr'
import { Form, Input, Button, TimePicker } from 'antd'
import moment from 'moment'
import { tuple } from 'antd/lib/_util/type'

const { RangePicker } = TimePicker

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

function RestaurantForm() {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm() // todo 提供不营业 Closed 选项

  async function onPublish(values) {
    const data = {
      Name: values.Name,
      Sun: `${moment(values.Sun_start).format('HH:mm')}-${moment(
        values.Sun_end
      ).format('HH:mm')}`,
      Mon: `${moment(values.Mon_start).format('HH:mm')}-${moment(
        values.Mon_end
      ).format('HH:mm')}`,
      Tue: `${moment(values.Tue_start).format('HH:mm')}-${moment(
        values.Tue_end
      ).format('HH:mm')}`,
      Wed: `${moment(values.Wed_start).format('HH:mm')}-${moment(
        values.Wed_end
      ).format('HH:mm')}`,
      Thu: `${moment(values.Thu_start).format('HH:mm')}-${moment(
        values.Thu_end
      ).format('HH:mm')}`,
      Fri: `${moment(values.Fri_start).format('HH:mm')}-${moment(
        values.Fri_end
      ).format('HH:mm')}`,
      Sat: `${moment(values.Sat_start).format('HH:mm')}-${moment(
        values.Sat_end
      ).format('HH:mm')}`,
    } // todo 本地验证开始时间小于结束时间
    setLoading(true)
    await fetch('/api/data-insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    })
    form.resetFields()
    setLoading(false)
    setTimeout(() => trigger('/api/data'), 3000);
  }

  return (
    <Form {...layout} form={form} name="news-insert" onFinish={onPublish}>
      <Form.Item name="Name" label="餐厅名称" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="Sun_start"
        label="周日 开始营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item
        name="Sun_end"
        label="周日 停止营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item
        name="Mon_start"
        label="周一 开始营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item
        name="Mon_end"
        label="周一 停止营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item
        name="Tue_start"
        label="周二 开始营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item
        name="Tue_end"
        label="周二 停止营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item
        name="Wed_start"
        label="周三 开始营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item
        name="Wed_end"
        label="周三 停止营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item
        name="Thu_start"
        label="周四 开始营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item
        name="Thu_end"
        label="周四 停止营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item
        name="Fri_start"
        label="周五 开始营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item
        name="Fri_end"
        label="周五 停止营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item
        name="Sat_start"
        label="周六 开始营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item
        name="Sat_end"
        label="周六 停止营业时间"
        rules={[{ required: true }]}
      >
        <TimePicker format={'HH:mm'} minuteStep={30} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          发布
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RestaurantForm
