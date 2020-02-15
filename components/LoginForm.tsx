import { Form, Input, Button } from 'antd'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
}

function LoginForm({ onLogin, isLoading }) {
  return (
    <Form
      {...layout}
      name="login"
      initialValues={{
        username: 'admin',
        password: 'admin',
      }}
      onFinish={onLogin}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
