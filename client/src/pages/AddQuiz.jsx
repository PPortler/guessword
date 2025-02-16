import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Flex, Form, Input, Typography, Checkbox, Image, message } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthCheck from '../hooks/useAuthCheck';
import NotLogin from '../components/NotLogin';
import Loader from '../components/Loader';

const { Text } = Typography;

function AddQuiz() {
  const navigate = useNavigate();

  //authentication
  const user = useAuthCheck();
  const [isLogin, setIsLogin] = useState(null)
  useEffect(() => {
    if (user === null) {
      setIsLogin(null);
    } else if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user])

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

  //manage choices
  const handleAddChoice = () => {
    setChoices([...choices, { choice: '', answer: false }]);
    setQuantityChoice(quantityChoice + 1); // เพิ่มจำนวนตัวเลือกเมื่อคลิก
  };
  const onChangeChoice = (index, field, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index][field] = value;
    setChoices(updatedChoices);
  };

  //message
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';


  //Form
  const [error, setError] = useState('')
  const onFinish = async () => {

    if (!title || !image || choices?.length === 1) {
      setError('กรุณากรอกข้อมูลให้ครบและถูกต้อง !')
      messageApi.close()
      return;
    }

    if (imageError) {
      setError('ที่อยู่รูปภาพไม่ถูกต้อง !')
      return;
    }

    let body = {
      title: title,
      image: image,
      choices: choices,
      author: author
    }

    messageApi.open({
      key,
      type: 'loading',
      content: 'กำลังอัพโหลด...',
    });

    try {
      const res = await axios.post(`${process.env.REACT_APP_PORT_API}/api/quiz/add_quiz`, body, {
        withCredentials: true, // ✅ ให้ Axios ส่ง Cookie ไปด้วย
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // ✅ หรือใช้ Token จาก localStorage
        }
      })

      if (res.status === 201) {
        window.location.reload();
      }

    } catch (err) {
      console.log(err)
      setError('เกิดข้อผิดพลาดชื่อซ้ำ !')
      return;
    }

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  //check image
  const [imageError, setImageError] = useState(false);

  //loader
  if (isLogin === null) {
    return (
      <Loader />
    );
  }
  return (
    <>
      {contextHolder}
      {isLogin ? (
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
          <Flex justify='end' className='mb-5'>
            <Text className='text-white text-xl '>สร้างคำถาม </Text>
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
              placeholder="เป็น link"
              style={{ background: 'transparent' }}
              className='bg-transparent text-white placeholder:text-gray-500 rounded-none  border-l-2 border-b-8'
              onChange={(e) => {
                setImage(e.target.value)
                setImageError(false)
              }}
              required={true}
            />
            {image && (
              <Image
                width={200}
                height={200}
                onError={() => setImageError(true)}
                onLoad={() => setImageError(false)}
                src={image}
                className='mt-3'
              />
            )}
          </Form.Item>

          {[...Array(quantityChoice)].map((_, index) => (
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
                placeholder="คำตอบ.."
                style={{ background: 'transparent' }}
                className='bg-transparent text-white placeholder:text-gray-500 rounded-none  border-l-2 border-b-8'
                onChange={(e) => onChangeChoice(index, 'choice', e.target.value)}
                required={true}
              />
              <Checkbox
                className='mt-2 text-white'
                onChange={(e) => onChangeChoice(index, 'answer', e.target.checked)}>
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
        </Form>
      ) : (
        <NotLogin />
      )}
    </>
  )
}

export default AddQuiz
