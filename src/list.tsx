import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const defaultCover = (
    <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    />
);

const List: React.FC = () => {
    type Book = {id: number, title: string, author: string, price: number};
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const response = await fetch('http://localhost:5000/books');
            const data = await response.json();
            setBooks(data || []); // 确保我们只设置 books 数组
          } catch (error) {
            console.error('Error fetching books:', error);
            setBooks([]);
          } 
        };
    
        fetchBooks();
      }, []);

    return (
        <Row gutter={24} justify="start" style={{ width: '100%', overflow: 'hidden' }}>
            {books.map((book) => (
                <Col key={book.id} span={6} style={{ padding: '24px' }}>
                    <Card title={book.title} bordered={true} hoverable={true} cover={defaultCover} >
                        <p><strong>Author: </strong> {book.author}</p>
                        <p><strong>Price: </strong> ${book.price}</p>
                        <Button
                            type="primary"
                            shape="round"
                            icon={<ShoppingCartOutlined style={{ fontSize: '18px' }} />}
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
