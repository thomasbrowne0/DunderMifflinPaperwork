import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { ordersAtom, fetchOrders } from '../state';

const Orders: React.FC = () => {
    const [orders, setOrders] = useAtom(ordersAtom);

    useEffect(() => {
        fetchOrders().then(setOrders);
    }, [setOrders]);

    return (
        <div>
            <h1>Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>{order.status}</li>
                ))}
            </ul>
        </div>
    );
}

export default Orders;