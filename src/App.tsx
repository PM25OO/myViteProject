import React, { useState } from 'react';
import List from './list.tsx';
import Cart from './cart.tsx';
import ButtonDrawer from './drawer.tsx';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WalletOutlined,
  BookOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [showList, setShowList] = useState<string>("0");
  const handleMenuClick = (e: { key: string }) => {
    setShowList(e.key); // 根据菜单项的 key 更新状态
  };

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <BookOutlined style={{fontSize: '18px'}} />,
              label: 'Lists',
              onClick: handleMenuClick,
            },
            {
              key: '2',
              icon: <ShoppingCartOutlined style={{fontSize: '18px'}}/>,
              label: 'Cart',
              onClick: handleMenuClick,
            },
            {
              key: '3',
              icon: <WalletOutlined style={{fontSize: '18px'}}/>,
              label: 'Wallet',
              onClick: handleMenuClick,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 16px',
            background: '#001529',
            display: 'flex',
            alignItems: 'center',
            position: 'relative', // 为绝对定位提供上下文
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // 添加阴影
          }}
        >
          {/* 左侧按钮 */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '18px', // 字体稍大
              width: 64,
              height: 64,
              color: '#fff', // 白色图标
            }}
          />

          {/* 中间标题 */}
          <div
            style={{
              position: 'absolute', // 使用绝对定位
              left: '50%', // 水平居中
              transform: 'translateX(-50%)', // 水平偏移负的50%，实现完全居中
              fontSize: '24px', // 增大字体
              fontWeight: 'bold',
              color: '#fff', // 白色字体
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', // 添加文字阴影
            }}
          >
            Welcome to My Book Store!
          </div>
        </Header>


        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#E8E8E8',
            borderRadius: borderRadiusLG,
          }}
        >
          {showList==='0' && <><List /><ButtonDrawer /></>}
          {showList==='1' && <><List /><ButtonDrawer /></>}
          {showList==='2' && <Cart />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;