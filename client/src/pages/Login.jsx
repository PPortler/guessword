import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Form, Input, Typography, message, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthCheck from '../hooks/useAuthCheck';
import Loader from '../components/Loader';

const { Text } = Typography

function Login() {

    //route
    const navigate = useNavigate();

    //loader
    const [isLoader, setIsLoader] = useState(null)
    //authentication
    const user = useAuthCheck();
    useEffect(() => {
        if (user) {
            navigate('/')
        } else {
            setIsLoader(false)
        }
    }, [user])

    //submit
    const [messageApi, contextHolder] = message.useMessage();

    const [error, setError] = useState(false)
    //submit
    const onFinish = async (values) => {
        setIsLoader(true)
        if (!values?.username || !values?.password) {
            setIsLoader(false);
            return;
        }
        const body = {
            username: values?.username,
            password: values?.password,
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_PORT_API}/api/user/sign_in`,
                body,
                {
                    withCredentials: true
                }
            )

            if (res.status === 200) {
                setError('')
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data)
                setIsLoader(false);
                return;
            }
        }
    };
    const onFinishFailed = (errorInfo) => {
        setIsLoader(false);
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className=' mx-auto mt-36'
            >

                <Form.Item
                    label={(
                        <Text className='text-white'>ชื่อผู้ใช้</Text>
                    )}
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'กรุณาระบุชื่อผู้ใช้!',
                        },
                    ]}
                >
                    <Input
                        // style={{ background: 'transparent' }}
                        className='placeholder:text-gray-500 rounded-none border-r-none border-l-2 border-t-none border-b-8'
                        placeholder='ระบุชื่อผู้ใช้'
                    />
                </Form.Item>

                <Form.Item
                    label={(
                        <Text className='text-white'>รหัสผ่าน</Text>
                    )}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'กรุณาระบุรหัสผ่าน!',
                        },
                    ]}
                >
                    <Input.Password

                        className=' placeholder:text-gray-500 rounded-none border-r-none border-l-2 border-t-none border-b-8'
                        placeholder='ระบุรหัสผ่าน'
                    />
                </Form.Item>
                {error && (
                    <Flex justify='end'>
                        <Text className='text-red-400 text-xs '>* {error}</Text>
                    </Flex>
                )}
                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox className='text-white'>จดจำรหัสผ่าน</Checkbox>
                </Form.Item>

                <Form.Item label={null} className='text-end'>
                    <Button type="none" className='text-blue-500'
                        onClick={() => navigate('/sign-up')}
                    >
                        ยังไม่มีบัญชี ?
                    </Button>
                    <Button type="primary" htmlType="submit">
                        เข้าสู่ระบบ
                    </Button>
                </Form.Item>
            </Form>
            {isLoader && (
                <Loader />
            )}
        </>
    )
}

export default Login
