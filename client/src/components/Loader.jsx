import React from 'react'
import { Flex, Spin, Space } from 'antd';


function Loader() {
    return (
        <>
            <Flex gap="middle" justify='center' align='center' className='fixed w-screen h-screen top-0 z-20 left-0'>
                    <Spin tip="Loading" size="large"></Spin>
            </Flex>
         
        </>
    )
}

export default Loader
