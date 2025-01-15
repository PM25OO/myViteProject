import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Modal } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';


const defaultCover = (
    <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    />
);

const List: React.FC = () => {
    type Book = { id: number, title: string, author: string, price: number };
    const [books, setBooks] = useState<Book[]>([]);
    const [cart, setCart] = useState<number[]>([]);
    const [openModalId, setOpenModalId] = useState<number | null>(null);

    const showModal = (bookId: number) => {
        setOpenModalId(bookId);
    };

    const handleOk = () => {
        setOpenModalId(null);
    };

    const handleCancel = () => {
        setOpenModalId(null);
    };

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

        const fetchCart = async () => {
            try {
                const response = await fetch('http://localhost:5000/cart');
                const data = await response.json();
                const cartIds = data.map((item: { id: number }) => item.id); // 获取购物车中的书籍 ID
                setCart(cartIds); // 更新购物车状态
            } catch (error) {
                console.error('Error fetching cart:', error);
                setCart([]); // 失败时设置为空
            }
        };

        fetchBooks();
        fetchCart();
    }, []);

    const handleAddToCart = (book: Book) => {

        if (cart.includes(book.id)) {
            // 移除购物车
            fetch(`http://localhost:5000/cart/${book.id}`, {
                method: 'DELETE'
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Failed to remove book from cart: ${response.status}`);
                    }
                    setCart((prevCart) => prevCart.filter((id) => id !== book.id));
                })
                .catch((error) => console.error('Error removing book from cart:', error));
        } else {
            // 添加到购物车
            fetch('http://localhost:5000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book),
            })
                .then(response => response.json())
                .then(() => {
                    setCart((prevCart) => [...prevCart, book.id]);
                })
                .catch(error => console.error('Error adding book to cart:', error));
        }
    }

    return (
        <Row gutter={24} justify="start" style={{ width: '100%', overflow: 'hidden' }}>
            {books.map((book) => (
                <Col key={book.id} span={6} style={{ padding: '24px' }}>
                    <Card title={book.title} bordered={true} hoverable={true} cover={defaultCover} onClick={() => showModal(book.id)}>
                        <p ><strong>Author: </strong> {book.author}</p>
                        <p><strong>Price: </strong> ${book.price}</p>
                        <Modal
                            title={book.title}
                            footer={null}
                            open={openModalId === book.id}
                            onCancel={(e) => {
                                e.stopPropagation(); // 阻止事件传播
                                handleCancel();
                            }}
                        >
                            <p><em><strong>Introduction...</strong></em></p>
                        </Modal>
                        <Button
                            type="primary"
                            shape="round"
                            icon={cart.includes(book.id) ?
                                <DeleteOutlined style={{ fontSize: '18px' }} />
                                :
                                <ShoppingCartOutlined style={{ fontSize: '18px' }} />}
                            onClick={(e) => { e.stopPropagation(); handleAddToCart(book) }}
                            style={{
                                backgroundColor: cart.includes(book.id) ? 'red' : 'green',
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
