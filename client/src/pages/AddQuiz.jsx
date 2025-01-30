import React from 'react'
import { useState } from 'react';
import { Button, Flex, Form, Input, Typography, Checkbox } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons'

const { Text } = Typography;

function AddQuiz() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const [quantityChoice, setQuantityChoice] = useState(1)

  const handleAddChoice = () => {
    setQuantityChoice(quantityChoice + 1); // เพิ่มจำนวนตัวเลือกเมื่อคลิก
  };

  return (
    <>
      <Form
        name="basic"
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
          <Text className='text-white text-xl '>สร้างคำถาม</Text>
        </Flex>
        <Form.Item
          label={
            <span className='text-white'>ตั้งคำถาม</span>
          }
          name="username"
          labelStyle={{ color: 'white' }}
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
            className='bg-transparent text-white placeholder:text-gray-500 rounded-none border-r-none border-l-2 border-t-none border-b-8' />
        </Form.Item>
        <Form.Item
          label={
            <span className='text-white'>รูปภาพ</span>
          }
          name="username"
          labelStyle={{ color: 'white' }}
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
            className='bg-transparent text-white placeholder:text-gray-500 rounded-none  border-l-2 border-b-8' />
        </Form.Item>
       
        {[...Array(quantityChoice)].map((_, index) => (
          <Form.Item
            label={
              <span className='text-white'>ตัวเลือก {index+1}</span>
            }
            name="username"
            labelStyle={{ color: 'white' }}
            rules={[
              {
                required: true,
                message: 'กรุณาระบุคำถาม',
              },
            ]}
          >
            <Input
              placeholder="คำตอบ.."
              style={{ background: 'transparent' }}
              className='bg-transparent text-white placeholder:text-gray-500 rounded-none  border-l-2 border-b-8' />
            <Checkbox className='mt-2 text-white' onChange={onChange}>คำตอบที่ถูก</Checkbox>
            <PlusCircleFilled
              style={{ display: quantityChoice !== index+1 || index === 3  ? 'none' : 'block' }}
              onClick={handleAddChoice}
              className='text-sky-500 text-2xl cursor-pointer flex justify-center'
            />
          </Form.Item>

        ))}


        <Form.Item
          label={
            <span className='text-white'>ผู้เขียน</span>
          }
          name="username"
          labelStyle={{ color: 'white' }}
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
            className='bg-transparent text-white placeholder:text-gray-500 rounded-none border-r-none border-l-2 border-t-none border-b-8' />
        </Form.Item>
        <Form.Item label={null} className='text-end'>
          <Button type="primary" htmlType="submit">
            ยืนยัน
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default AddQuiz
