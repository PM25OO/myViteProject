import React from 'react';
import { Card, Col, Row } from 'antd';

const cover = 
    <img
      alt="example"
      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    />

const List: React.FC = () => (
    <Row gutter={24} justify="start" style={{ width: '100%', overflow: 'hidden' }}>
        {Array.from({ length: 15 }).map((_, index) => (
            <Col key={index} span={6} style={{ padding: '24px' }}>
                <Card title={`Book${index + 1}`} bordered={true} hoverable={true} cover={cover} >
                    <p>Author</p>
                    <p>Price</p>
                </Card>
            </Col>
        ))}
    </Row>
);

export default List;
