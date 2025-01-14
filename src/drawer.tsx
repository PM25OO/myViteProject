import React, { useState } from 'react';
import { FloatButton, Drawer } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Cart from './cart.tsx';

const ButtonDrawer: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <FloatButton
                type="primary"
                onClick={showDrawer}
                style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                icon={<ShoppingCartOutlined style={{ fontSize: '18px' }} />}
            >
                Open
            </FloatButton>

            <Drawer title="Your shopping cart" onClose={onClose} open={open}>
                <Cart />
            </Drawer>
        </>
    );
};

export default ButtonDrawer;