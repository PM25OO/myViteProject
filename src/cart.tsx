import React, { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';


const Cart: React.FC = () => {
  type Book = { id: number, title: string, author: string, price: number };
  const [cart, setCart] = useState<Book[]>([]);


  useEffect(() => {

    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:5000/cart');
        const data = await response.json();
        setCart(data || []); // 确保我们只设置 cart 数组
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCart([]);
      }
    };

    fetchCart();
  });

  return (
    <List
      itemLayout="horizontal"
      dataSource={cart}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={<a href='https://example.com' target='blank'>{item.title}</a>}
            description={`${item.author}`}
          />
        </List.Item>
      )}
    />
  );
};

export default Cart;