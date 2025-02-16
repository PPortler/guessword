import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Form, Input, Typography, message, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthCheck from '../hooks/useAuthCheck';
import Loader from '../components/Loader';

const { Text } = Typography

function Register() {

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

    const [messageApi, contextHolder] = message.useMessage();

    const [error, setError] = useState('')
    //submit
    const onFinish = async (values) => {
        setIsLoader(true);

        if (!values?.first_name || !values?.last_name || !values?.username || !values?.password || !values?.confirm_password) {
            setError('ระบุข้อมูลให้ครบ')
            setIsLoader(false);
            return;
        }

        if (values?.password !== values?.confirm_password) {
            setError('รหัสผ่านไม่ตรงกัน')
            setIsLoader(false);
            return;
        }
        const body = {
            first_name: values?.first_name,
            last_name: values?.last_name,
            username: values?.username,
            password: values?.password,
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_PORT_API}/api/user/new_user`, body)
            if (res.status === 201) {
                setError('')
                localStorage.setItem("token", res.data.token); // ✅ เก็บ Token
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            }

        } catch (err) {
            if (err.response) {
                setError(err.response.data)
                setIsLoader(false);
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
                        <Text className='text-white'>ชื่อ</Text>
                    )}
                    name="first_name"
                    rules={[
                        {
                            required: true,
                            message: 'กรุณาระบุชื่อ!',
                        },
                    ]}
                >
                    <Input
                        // style={{ background: 'transparent' }}
                        className='placeholder:text-gray-500 rounded-none border-r-none border-l-2 border-t-none border-b-8'
                        placeholder='ระบุชื่อ'
                    />
                </Form.Item>
                <Form.Item
                    label={(
                        <Text className='text-white'>นามสกุล</Text>
                    )}
                    name="last_name"
                    rules={[
                        {
                            required: true,
                            message: 'กรุณาระบุนามสกุล!',
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
                <Form.Item
                    label={(
                        <Text className='text-white'>ยืนยันรหัสผ่าน</Text>
                    )}
                    name="confirm_password"
                    rules={[
                        {
                            required: true,
                            message: 'กรุณาระบุรหัสผ่านซ้ำ!',
                        },
                    ]}
                >
                    <Input.Password

                        className=' placeholder:text-gray-500 rounded-none border-r-none border-l-2 border-t-none border-b-8'
                        placeholder='ระบุรหัสผ่านซ้ำ'
                    />
                </Form.Item>
                {error && (
                    <Flex justify='end'>
                        <Text className='text-red-400 text-xs '>* {error}</Text>
                    </Flex>
                )}
                <Form.Item label={null} className='text-end mt-3'>
                    <Button type="none" className='text-blue-500'
                        onClick={() => navigate('/sign-in')}>
                        มีบัญชีแล้ว?
                    </Button>
                    <Button type="primary" htmlType="submit">
                        ลงทะเบียน
                    </Button>
                </Form.Item>
            </Form>
            {isLoader && (
                <Loader/>
            )}
        </>
    )
}

export default Register
