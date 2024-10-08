import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { customersAtom } from '../atoms/Atoms';
import NavBar from './components/NavBar';
import { fetchCustomerOrders } from '../services/OrderService';

const CustomerDetailPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [customers] = useAtom(customersAtom);
    const customer = customers.find((customer: any) => customer.id === parseInt(id || '', 10));
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            if (id) {
                const customerOrders = await fetchCustomerOrders(parseInt(id, 10));
                setOrders(customerOrders);
            }
        };
        getOrders();
    }, [id]);

    if (!customer) {
        return <div>Customer not found</div>;
    }

    return (
        <div>
            <NavBar />
            <h1>{customer.name}</h1>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <p>Address: {customer.address}</p>
            <h2>Order History</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order: any) => (
                        <li key={order.id}>
                            <p>Order Date: {order.orderDate}</p>
                            <p>Delivery Date: {order.deliveryDate}</p>
                            <p>Status: {order.status}</p>
                            <p>Total Amount: ${order.totalAmount}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found for this customer.</p>
            )}
        </div>
    );
};

export default CustomerDetailPage;