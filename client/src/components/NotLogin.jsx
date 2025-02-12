import React from 'react'
import { Button, Flex, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

function NotLogin() {
    const navigate = useNavigate();
  return (
    <Flex justify='center'>
    <Flex className='bg-white w-fit rounded-lg mx-auto mt-28 px-10'>
        <Result
            title="เข้าสู่ระบบก่อนทำรายการ"
            extra={
                <Button type="primary" key="console" onClick={() => navigate('/sign-in')}>
                    เข้าสู่ระบบตอนนี้
                </Button>
            }
        />
    </Flex>
</Flex>
  )
}

export default NotLogin
