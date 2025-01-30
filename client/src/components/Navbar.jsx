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
                <Button type='ghost' className='text-[#9BC2B2] font-bold text-xl' onClick={() => navigate("/")}>Play</Button>
                <Button onClick={() => navigate("/add_quiz")}>AddGame</Button>
            </Flex>

        </Flex>
    )
}

export default Navbar
