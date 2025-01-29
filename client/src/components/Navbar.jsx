import React from 'react'
import { Button, Flex, Row, Col, Typography } from 'antd';
const { Title } = Typography;

function Navbar() {
    return (
        <Flex
            justify='space-between'
            align='center'
            wrap={true}
            className='px-14 py-3 shadow-sm '
        >
            <Flex>
                <Button type="ghost" className='text-white'>Guess Word</Button>
            </Flex>
            <Flex
                gap='small'
            >
                <Button type='ghost' className='text-[#9BC2B2] font-bold text-xl' >Play</Button>
                <Button >AddGame</Button>
                <Button>Score</Button>
            </Flex>

        </Flex>
    )
}

export default Navbar
