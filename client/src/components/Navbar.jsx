import React from 'react'
import { Button, Flex, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function Navbar() {
    const navigate = useNavigate();

    return (
        <Flex
            justify='space-between'
            align='center'
            wrap={true}
            className='px-14 py-3 shadow-sm '
        >
            <Flex>
                <Button type="ghost" className='text-white' onClick={() => navigate("/")}>Guess Word</Button>
            </Flex>
            <Flex
                gap='small'
            >
                <Button type='ghost' className='text-[#9BC2B2] font-bold text-xl' onClick={() => {
                    navigate("/")
                    window.location.reload()
                }}>
                    เล่น
                </Button>
                <Button onClick={() => navigate("/add-quiz")}>เพิ่มคำถาม</Button>
                <Button onClick={() => navigate("/view-quiz")}>คำถามทั้งหมด</Button>
                <Button type='none' className='text-white' onClick={() => navigate("/sign-in")}>เข้าสู่ระบบ</Button>
            </Flex>

        </Flex>
    )
}

export default Navbar
