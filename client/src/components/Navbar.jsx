import React, { useEffect, useState } from 'react'
import { Button, Flex, Avatar, Dropdown, Menu, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useAuthCheck from '../hooks/useAuthCheck';
import axios from 'axios';

const { Text } = Typography

function Navbar() {
    const navigate = useNavigate();

    //authentication
    const user = useAuthCheck();
    const [isLogin, setIsLogin] = useState(null)
    useEffect(() => {
        if (user === null) {
            setIsLogin(null)
        } else if (user) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [user])

    console.log(user?.first_name)
    //menu profile
    const menu = (
        <Menu>
            {isLogin ? (
                <>
                    <Menu.Item key="1" onClick={() => logout()}>
                        ออกจากระบบ
                    </Menu.Item>
                </>
            ) : (
                <Menu.Item key="1" onClick={() => navigate('/sign-in')}>
                    เข้าสู่ระบบ
                </Menu.Item>
            )}
        </Menu>
    );

    const logout = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_PORT_API}/auth/logout`, {
                withCredentials: true
            })

            if (res.status === 200) {
                setIsLogin(false);
            }
        } catch (err) {
            console.log(err)
        }

    }


    return (
        <Flex
            justify='space-between'
            align='center'
            wrap={true}
            className='px-14 py-3 shadow-sm '
        >

            <Button type="ghost" className='text-white' onClick={() => navigate("/")}>GuessWord DooMai</Button>

            <Flex
                gap='small'
                align='center'
            >
                <Button type='ghost' className='text-[#9BC2B2] font-bold text-xl' onClick={() => {
                    navigate("/")
                    window.location.reload()
                }}>
                    เล่น
                </Button>
                <Button onClick={() => navigate("/add-quiz")}>เพิ่มคำถาม</Button>
                <Button onClick={() => navigate("/view-quiz")}>คำถามทั้งหมด</Button>
                <Dropdown overlay={menu} trigger={['click']} className='cursor-pointer flex items-center'>
                    {isLogin ? (
                        <Flex align='center ' gap={8}>
                            <Avatar src={<img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="avatar" />} />
                           <Text className='text-white'>{user?.first_name}  {user?.last_name}</Text>
                        </Flex>
                    ) : (
                        <Avatar icon={<UserOutlined />} />
                    )}
                </Dropdown>
            </Flex>

        </Flex>
    )
}

export default Navbar
