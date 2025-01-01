import React from 'react';
import { Button, Card, Col, Row } from 'antd';
import { ShoppingCartOutlined} from '@ant-design/icons';

const cover =
    <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    />



const List: React.FC = () => {
    return (
        <Row gutter={24} justify="start" style={{ width: '100%', overflow: 'hidden' }}>
            {Array.from({ length: 15 }).map((_, index) => (
                <Col key={index} span={6} style={{ padding: '24px' }}>
                    <Card title={`Book${index + 1}`} bordered={true} hoverable={true} cover={cover} >
                        <p>Author</p>
                        <p>Price</p>
                        <Button
                            type="primary"
                            shape="round"
                            icon={<ShoppingCartOutlined style={{fontSize: '18px'}}/>}
                            style={{
                                position: 'absolute', 
                                bottom: '16px', 
                                right: '16px', 
                            }} />
                    </Card>
                </Col>
            ))}
        </Row>
    )

};

export default List;
