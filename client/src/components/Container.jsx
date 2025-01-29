import React from 'react'
import { Image, Flex, Card, Col, Row, Space, Carousel, Typography } from 'antd';
const { Text } = Typography;

function Container() {
    const contentStyle = {
        margin: 0,
        height: '500px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <>
            <Space className='flex flex-col mt-24'>
                <Row className='flex flex-col gap-2'>
                    <Col className='flex flex-col'>
                        <Text className='text-white text-lg'>ข้อ 1</Text>
                        <Text className='text-white'>จากภาพคือคำว่าอะไร ?</Text>
                    </Col>
                    <Image
                        width={200}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                </Row>
                <Flex justify='center' className=' z-10 mt-16'>

                    <Row gutter={16}>
                        <Col >
                            <Card title="ตัวเลือก 1" className='w-52 hover:-translate-y-2 hover:shadow-lg cursor-pointer transition-transform'>
                                ไก่
                            </Card>
                        </Col>
                        <Col >
                            <Card title="ตัวเลือก 2" className='w-52 hover:-translate-y-2 hover:shadow-lg cursor-pointer transition-transform'>
                                ไข่
                            </Card>
                        </Col>
                        <Col >
                            <Card title="ตัวเลือก 3" className='w-52 hover:-translate-y-2 hover:shadow-lg cursor-pointer transition-transform'>
                                พร้อมกัน
                            </Card>
                        </Col>
                        <Col >
                            <Card title="ตัวเลือก 4" className='w-52 hover:-translate-y-2 hover:shadow-lg cursor-pointer transition-transform'>
                                ไม่มีข้อถูก
                            </Card>
                        </Col>

                    </Row>
                </Flex>
            </Space>
        </>
    )
}

export default Container
