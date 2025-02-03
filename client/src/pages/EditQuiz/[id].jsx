import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Flex, Form, Input, Typography, Checkbox, Image, message } from 'antd';
import { PlusCircleFilled, LeftSquareFilled } from '@ant-design/icons'
import axios from 'axios';
import { useParams } from 'react-router-dom';  // นำเข้า useParams
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

function EditQuiz() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [quantityChoice, setQuantityChoice] = useState(1)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState('')
    const [choices, setChoices] = useState([
        {
            choice: '',
            answer: false,
        }
    ])

    useEffect(() => {
        getQuiz(id);
    }, [])

    //get data
    const [questionData, setQuestionData] = useState({})
    const getQuiz = async (id) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_PORT_API}/api/quiz/${id}`);

            if (res.status === 200) {
                setQuestionData(res.data)
                setChoices(res?.data?.choices)
                setQuantityChoice(res.data?.choices?.length)
                return;
            } else {
                console.log('เกิดข้อผิดพลาด');
                return;
            }
        } catch (err) {
            console.log(err)
        }
    }

    //manage choices
    const handleAddChoice = () => {
        setChoices([...questionData?.choices, { choice: '', answer: false }]);
        setQuantityChoice(quantityChoice + 1); // เพิ่มจำนวนตัวเลือกเมื่อคลิก
    };
    const onChangeChoice = (index, field, value) => {
        const updatedChoices = [...choices];
        updatedChoices[index][field] = value;
        setChoices(updatedChoices);
    };

    //Form
    const [error, setError] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';

    const onFinish = async () => {
        const tempTitle = title || questionData?.title
        const tempImage = image || questionData?.image
        const tempChoices = choices || questionData?.choices
        const tempAuthor = author || questionData?.author

        if (!tempTitle || !tempImage || tempChoices?.length === 1) {
            setError('กรุณากรอกข้อมูลให้ครบและถูกต้อง !')
            return;
        }

        if (imageError) {
            setError('ที่อยู่รูปภาพไม่ถูกต้อง !')
            return;
        }

        let body = {
            title: tempTitle,
            image: tempImage,
            choices: tempChoices,
            author: tempAuthor
        }

        try {
            const res = await axios.put(`${process.env.REACT_APP_PORT_API}/api/quiz/update_quiz/${id}`, body)

            if (res.status === 200) {
                console.log("บันทึกคำถามสำเร็จ");
                messageApi.open({
                    key,
                    type: 'success',
                    content: 'อัพเดทแล้ว!',
                    duration: 1,
                });
                setTimeout(() => {
                    navigate('/view_quiz')
                }, 1500);

            } else {
                console.log("เกิดข้อผิดพลาดบันทึกไม่สำเร็จ");
            }

        } catch (err) {
            console.log(err)
            messageApi.open({
                key,
                type: 'error',
                content: 'เกิดข้อผพลาดดลองใหม่ภายหลัง!',
                duration: 1,
            });
            return;
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //check image
    const [imageError, setImageError] = useState(false);

    return (
        <>
            {contextHolder}
            <Form
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}

                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className='max-w-96 mx-auto py-14'
            >
                <Flex gap={10} onClick={() => navigate('/view_quiz')} className='cursor-pointer'>
                    <LeftSquareFilled className='text-white text-xl' />
                    <Text className='text-white'>ย้อนกลับ</Text>
                </Flex>
                {questionData?._id ? (
                    <>
                        <Flex justify='end' className='mb-5'>
                            <Text className='text-white text-xl '>แก้ไข</Text>
                        </Flex>
                        <Form.Item
                            label={
                                <span className='text-white'>ตั้งคำถาม <span className='text-red-400'>*</span></span>
                            }

                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุคำถาม',
                                },
                            ]}
                        >
                            <Input
                                defaultValue={`${questionData?.title}`}
                                placeholder="ลองทายภาพนี้ดูสิ ? ..."
                                style={{ background: 'transparent' }}
                                className='bg-transparent text-white placeholder:text-gray-500 rounded-none border-r-none border-l-2 border-t-none border-b-8'
                                onChange={(e) => setTitle(e.target.value)}
                                required={true}
                            />
                        </Form.Item>
                        <Form.Item
                            label={
                                <span className='text-white'>รูปภาพ <span className='text-red-400'>*</span></span>
                            }

                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุคำถาม',
                                },
                            ]}
                        >
                            <Input
                                defaultValue={`${questionData?.image}`}
                                placeholder="เป็น link"
                                style={{ background: 'transparent' }}
                                className='bg-transparent text-white placeholder:text-gray-500 rounded-none  border-l-2 border-b-8'
                                onChange={(e) => {
                                    setImage(e.target.value)
                                    setImageError(false)
                                }}
                                required={true}
                            />
                            {image || questionData?.image && (
                                <Image
                                    width={200}
                                    height={200}
                                    onError={() => setImageError(true)}
                                    onLoad={() => setImageError(false)}
                                    src={`${image || questionData?.image}`}
                                    className='mt-3'
                                />
                            )}
                        </Form.Item>

                        {choices.map((choice, index) => (
                            <Form.Item
                                label={
                                    <span className='text-white'>ตัวเลือก {index + 1} <span className='text-red-400'>*</span></span>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณาระบุคำถาม',
                                    },
                                ]}
                                key={index}
                            >
                                <Input
                                    defaultValue={choice?.choice}
                                    placeholder="คำตอบ.."
                                    style={{ background: 'transparent' }}
                                    className='bg-transparent text-white placeholder:text-gray-500 rounded-none  border-l-2 border-b-8'
                                    onChange={(e) => onChangeChoice(index, 'choice', e.target.value)}
                                    required={true}
                                />
                                <Checkbox
                                    className='mt-2 text-white'
                                    onChange={(e) => onChangeChoice(index, 'answer', e.target.checked)}
                                    checked={choice?.answer}>
                                    คำตอบที่ถูก
                                </Checkbox>
                                <PlusCircleFilled
                                    style={{ display: quantityChoice !== index + 1 || index === 3 ? 'none' : 'block' }}
                                    onClick={handleAddChoice}
                                    className='text-sky-500 text-2xl cursor-pointer flex justify-center'
                                />
                            </Form.Item>

                        ))}


                        <Form.Item
                            label={
                                <span className='text-white'>ผู้เขียน</span>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาระบุคำถาม',
                                },
                            ]}
                            onChange={(e) => setAuthor(e.target.value)}
                        >
                            <Input
                                defaultValue={questionData?.author}
                                placeholder="ลองทายภาพนี้ดูสิ ? ..."
                                style={{ background: 'transparent' }}
                                className='bg-transparent text-white placeholder:text-gray-500 rounded-none border-r-none border-l-2 border-t-none border-b-8'
                            />
                        </Form.Item>
                        {error && (
                            <Flex justify='end'>
                                <Text className='text-red-400 text-xs '>* {error}</Text>
                            </Flex>
                        )}
                        <Form.Item label={null} className='text-end mt-3'>
                            <Button type="primary" htmlType="submit">
                                ยืนยัน
                            </Button>
                        </Form.Item>
                    </>
                ) : (
                    <Flex justify='center'>
                        <Text className='text-white '>กำลังโหลด...</Text>
                    </Flex>
                )}
            </Form>
        </>
    )
}

export default EditQuiz
