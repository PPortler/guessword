import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AutoComplete, Flex, Card, List, Image, Typography, Pagination, Row, Col, Alert, Space, Button } from 'antd';
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

    return (
        <>
        {/* กดกาออกแล้วมันไม่กลับมา */}
            {deleteItemID && (
                <Alert
                    message={`ต้องการลบ ?`}
                    description={(
                        <Flex vertical='column'>
                            <Text className=''>"{deleteItemName}"</Text>
                            <Text>จากผู้เขียน: {deleteItemAuthor}</Text>
                        </Flex>
                    )}
                    type="info"
                    action={
                        <Space direction="vertical">
                            <Button size="small" type="primary">
                                Accept
                            </Button>
                            <Button size="small" danger ghost>
                                Decline
                            </Button>
                        </Space>
                    }
                    className='w-full absolute z-10 top-0 shadow '
                />
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
                <Flex className='mt-5'>
                    <Row gutter={[16, 16]} className=''>
                        {currentData.map((item, index) => (
                            <Col key={index} className=''>
                                <Card
                                    title={(
                                        <Flex justify='space-between' align='center'>
                                            <Text className='w-32 text-ellipsis overflow-hidden whitespace-nowrap'>{item.title}</Text>
                                            <Flex gap={10} className=''>
                                                <Text className='text-gray-500 cursor-pointer' onClick={() => navigate(`/update_quiz/${item?._id}`)}><EditFilled /></Text>
                                                <Text className='text-red-500 cursor-pointer' onClick={() => {
                                                    setDeleteItemID(item?._id)
                                                    setDeleteItemName(item?.title)
                                                    setDeleteItemAuthor(item?.author)
                                                }}><DeleteFilled /></Text>
                                            </Flex>
                                        </Flex>
                                    )}
                                    className='w-full'>
                                    <Flex gap={10} vertical='column'>
                                        <Text>ผู้เขียน: {item.author}</Text>
                                        <Image
                                            width={200}
                                            height={200}
                                            src={item.image}
                                            preview={false}
                                        />
                                    </Flex>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                </Flex>
                <Pagination align="end" className='mt-5' onChange={changePage} defaultCurrent={1} total={50} style={{ color: 'white' }} />

            </Flex>
        </>
    )
}

export default ViewQuiz
