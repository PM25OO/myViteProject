import React, { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

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
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={<a>{item.title}</a>}
            description="Ant Design, a design language for background Applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  );
};

export default Cart;