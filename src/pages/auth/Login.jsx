import React from 'react';
import {
  Typography, Input, Row, Col, Layout, Button, Form,
} from 'antd';
import './Login.style.scss';
import bg from '../../assets/images/bg.jpg';
import { UserIcon, LockIcon, MailIcon } from '../../assets/svg';
import useToggle from '../../common/hooks/useToggle';

const { Title } = Typography;

function Login() {
  const [login, setLogin] = useToggle(false);
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Layout breakpoint="sm">
      <Row justify="center" className="login" style={{ backgroundImage: `url(${bg})` }}>
        <Col xs={24} sm={24} md={5} style={{ padding: '0 20px' }}>
          <div className="content">
            <div className="header">
              <Title level={3}>Login</Title>
              {/* <Title level={2}>Âm Nhạc Thực Chiến</Title> */}
            </div>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="form"
            >
              {!login && (
              <div>
                <Form.Item
                  name="firstname"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your First name!',
                    },
                  ]}
                >
                  <Input size="large" placeholder="First name" prefix={<UserIcon />} />
                </Form.Item>
                <Form.Item
                  name="nickname"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Nick name!',
                    },
                  ]}
                >
                  <Input size="large" placeholder="Nickame" prefix={<UserIcon />} />
                </Form.Item>

              </div>
              )}
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                ]}
              >
                <Input size="large" placeholder="Email" prefix={<MailIcon />} />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: '5px' }}
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                  {
                    pattern: /^.{8,}$/,
                    message: 'Passwords must be at least 8 characters long',
                  },
                ]}
              >
                <Input.Password size="large" placeholder="Password" prefix={<LockIcon />} />
              </Form.Item>
              <Form.Item style={{ marginBottom: '10px' }}>
                <Row justify="space-between" className="reforget">
                  <Col style={{ fontWeight: '500' }}>Forget Password</Col>
                  <Col style={{ fontWeight: '500', cursor: 'pointer' }} onClick={setLogin.toggle}>{ login ? 'Sign up' : 'Sign in' }</Col>
                </Row>
              </Form.Item>
              <Form.Item>
                <Button type="primary" size="large" htmlType="submit" style={{ margin: 'auto', display: 'block' }}>Sign up</Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>

    </Layout>
  );
}

export default Login;
