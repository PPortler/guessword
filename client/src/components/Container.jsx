import React from 'react'
import { useState, useEffect } from 'react';
import { Image, Flex, Card, Col, Row, Space, Carousel, Typography, Button } from 'antd';
import axios from 'axios';
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

    useEffect(() => {
        getQuiz();
    }, [])
    const [questionData, setQuestionData] = useState([])

    const getQuiz = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_PORT_API}/api/quiz`);

            if (res.status === 200) {
                setQuestionData(res.data)
                return;
            } else {
                console.log('เกิดข้อผิดพลาด');
                return;
            }
        } catch (err) {
            console.log(err)
        }
    }

    console.log(questionData)
    const [status, setStatus] = useState(0)
    const [score, setScore] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)
    const [result, setResult] = useState(false)

    const selectChoice = (answer) => {

        setShowAnswer(true)
        setTimeout(() => {
            if (questionData?.length - 1 === status) {
                setResult(true);
            }
            if (answer) {
                setScore(score + 1)
            }
            setStatus(status + 1)
            setShowAnswer(false)
        }, [1000])
    }

    const resetGame = () => {
        setStatus(0)
        setScore(0)
        setShowAnswer(false)
        setResult(false)
    }

    return (
        <>
            {result ? (
                <>
                    <Flex className='mt-24' vertical="vertical" justify='center' align='center'>
                        <Image
                            width={400}
                            src="https://i.pinimg.com/originals/d4/79/28/d47928c3c4aab232ea870a660e5defd7.gif"
                            preview={false}
                        />
                        <Text className='text-white'>ขอบคุณที่มาร่วมสนุกครับ ^_^</Text>
                        <Flex vertical="vertical" className='mt-5' gap={20}>
                            <Text className=' text-white flex justify-center'>คะแนนที่ได้: {score}/{questionData?.length}</Text>
                            <Button color="cyan" variant="solid" onClick={resetGame}>
                                เริ่มใหม่
                            </Button>
                        </Flex>
                    </Flex>

                </>
            ) : (
                <Space className='flex flex-col mt-24'>
                    <Row className='flex flex-col gap-2'>
                        <Col className='flex flex-col'>
                            <Text className='text-white text-lg'>ข้อ {status + 1}.</Text >
                            <Text className='text-white'>{questionData[status]?.title} ?</Text>
                        </Col >
                        <Image
                            width={200}
                            height={200}
                            src={questionData[status]?.image}
                        />
                        <Text className=' text-white flex justify-end'>ผู้เขียน: {questionData[status]?.author ? questionData[status]?.author:'นิรนาม'}</Text>
                    </Row >
                    <Flex justify='center' className=' z-10 mt-14' >
                        <Flex vertical="vertical" gap={10}>
                            <Text className=' text-white flex justify-end'>คะแนน: {score}</Text>
                            <Row gutter={16}>
                                {questionData[status]?.choices?.map((choice, index) => {
                                    return (
                                        <Col className={``} key={index} onClick={() => {
                                            if (!showAnswer) {
                                                selectChoice(choice?.answer)
                                            }
                                        }}>
                                            <Card title={
                                                <span className={showAnswer && choice?.answer ? 'text-white' : 'text-black'}>
                                                    ตัวเลือก {index + 1}
                                                </span>
                                            }
                                                className={
                                                    ` ${showAnswer && choice?.answer ? 'bg-green-700 text-white' : ''}
                                            w-52 hover:-translate-y-2 hover:shadow-lg cursor-pointer transition-transform`
                                                }
                                            >
                                                {choice?.choice}
                                            </Card>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Flex>
                    </Flex>
                </Space >
            )
            }
        </>
    )
}

export default Container
