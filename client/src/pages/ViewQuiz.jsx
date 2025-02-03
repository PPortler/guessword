import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AutoComplete, Flex, Card, List, Image, Typography, Pagination, Row, Col, Popconfirm, message, Button } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;
const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});

function ViewQuiz() {
    const navigate = useNavigate();

    useEffect(() => {
        getQuiz();
    }, [])

    const [page, setPage] = useState(1);
    const [currentData, setCurrentData] = useState([]); // ข้อมูลสำหรับหน้าเดียว
    const pageSize = 10; // ขนาดข้อมูลต่อหน้า

    //search
    const [search, setSearch] = useState('');
    const [options, setOptions] = useState([]);

    const getPanelValue = (searchText) =>
        !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];
    const onSelect = (data) => {
        console.log('onSelect', data);
    };

    //data
    const [quizData, setQuizData] = useState([])
    const getQuiz = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_PORT_API}/api/quiz`);

            if (res.status === 200) {
                setQuizData(res.data)
                setCurrentData(res.data.slice(0, pageSize)); // แสดงข้อมูลหน้าแรก
                return;
            } else {
                console.log('เกิดข้อผิดพลาด');
                return;
            }
        } catch (err) {
            console.log(err)
        }
    }

    //changePage
    const changePage = (page) => {
        setPage(page);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setCurrentData(quizData.slice(startIndex, endIndex)); // แสดงข้อมูลที่หน้าปัจจุบัน
    }

    //deleted
    const [deleteItemID, setDeleteItemID] = useState('');
    const [deleteItemName, setDeleteItemName] = useState('');
    const [deleteItemAuthor, setDeleteItemAuthor] = useState('');

    //alert
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setOpen(false); // ปิด Popconfirm ทันที
        const hideLoading = messageApi.loading("กำลังลบ...", 0); // 0 = ไม่ปิดอัตโนมัติ
        const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 2000)); // หน่วงเวลา 2 วิ

        try {
            const res = await axios.delete(`${process.env.REACT_APP_PORT_API}/api/quiz/delete_quiz/${deleteItemID}`);

            if (res.status === 200) {
                await minLoadingTime; // รอให้ครบ 2 วินาที
                hideLoading(); // ปิดข้อความ "กำลังลบ..."
                success(); // เรียกฟังก์ชันแสดงข้อความสำเร็จ
                return;
            }
        } catch (err) {
            console.error("ลบไม่สำเร็จ:", err);
            await minLoadingTime; // รอให้ครบ 2 วินาที
            hideLoading(); // ปิดข้อความ "กำลังลบ..."
            error(); // เรียกฟังก์ชันแสดงข้อความผิดพลาด
            return;
        }
    };


    const handleCancel = () => {
        setOpen(false);
    };

    const [messageApi, contextHolder] = message.useMessage();

    //message
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'ลบคำถามแล้ว',
        });
        setCurrentData((prevData) => prevData.filter((q) => q?._id !== deleteItemID));
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'เกิดข้อผิดพลาดลองใหม่ในภายหลัง',
        });
    };
    console.log(deleteItemID)
    return (
        <>
            {contextHolder}
            {/* กดกาออกแล้วมันไม่กลับมา */}
            {deleteItemID && (
                <Popconfirm
                    title="ลบคำถามนี้?"
                    description="คุณแน่ใจหรือไม่ว่าต้องการลบคำถามนี้?"
                    onConfirm={handleOk}
                    onCancel={handleCancel}
                    okText="ยืนยัน"
                    cancelText="ยกเลิก"
                >
                    <p>คำถาม: "{deleteItemName}"</p>
                    <p>จากผู้เขียน: {deleteItemAuthor}</p>
                </Popconfirm>
            )}
            <Flex
                className='px-14 py-10'
                vertical='column'
            >
                <Flex justify='end' className='w-full'>
                    <Flex align='center' gap={10} >
                        <Text className='text-white'>ค้นหา</Text>
                        <AutoComplete
                            options={options}
                            style={{
                                width: 200,
                            }}
                            onSelect={onSelect}
                            onChange={(data) => setSearch(data)}
                            onSearch={(text) => setOptions(getPanelValue(text))}
                            placeholder="คำถาม, ชื่อผู้เขียน"
                        // variant="borderless" // สีพื้นหลัง

                        />
                    </Flex>
                </Flex>
                {currentData.length >= 1 ? (
                    <>
                        <Flex className='mt-5'>
                            <Row gutter={[16, 16]} className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
                                {currentData.map((item, index) => (

                                    <Col
                                        key={index}
                                        justify='column'
                                        vertical='column'
                                        className='bg-white py-2 px-5 rounded-lg shadow'
                                    >
                                        <Flex justify='space-between' align='center'>
                                            <Text className='w-32 text-ellipsis overflow-hidden whitespace-nowrap'>{item.title}</Text>
                                            <Flex gap={10} className=''>
                                                <Text className='text-gray-500 cursor-pointer' onClick={() => navigate(`/update_quiz/${item?._id}`)}><EditFilled /></Text>

                                                <Popconfirm
                                                    title="ลบคำถามนี้?"
                                                    description={(
                                                        <>
                                                            <p>คำถาม: "{item?.title}"</p>
                                                            <p>จากผู้เขียน: {item?.author}</p>
                                                        </>
                                                    )}
                                                    onConfirm={handleOk}
                                                    onCancel={handleCancel}
                                                    okText="ยืนยัน"
                                                    cancelText="ยกเลิก"
                                                    className='text-red-500 cursor-pointer'
                                                    onClick={() => {
                                                        setDeleteItemID(item?._id)
                                                        setDeleteItemName(item?.title)
                                                        setDeleteItemAuthor(item?.author)
                                                        showModal();
                                                    }}><DeleteFilled /></Popconfirm>
                                            </Flex>
                                        </Flex>
                                        <Flex gap={10} vertical='column'>
                                            <Text className='whitespace-nowrap text-ellipsis overflow-hidden'>ผู้เขียน: {item.author}</Text>
                                            <Image
                                                className=''
                                                height={200}
                                                src={item.image}
                                                preview={true}

                                            />
                                        </Flex>
                                    </Col>

                                ))}
                            </Row>

                        </Flex>

                    </>
                ) : (
                    <Flex justify='center' className='mt-10'>
                        <Text className='text-white'>กำลังโหลด...</Text>
                    </Flex>
                )}
                <Pagination align="end" className='mt-5' onChange={changePage} defaultCurrent={1} total={quizData?.length} style={{ color: 'white' }} />
            </Flex>
        </>
    )
}

export default ViewQuiz
