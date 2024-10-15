import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { customersAtom, papersAtom } from '../atoms/Atoms';
import NavBar from './components/NavBar';
import DropdownMenu from './components/DropdownMenu';
import { fetchCustomerOrders } from '../services/OrderService';
import { fetchPapers } from '../services/PaperService';

const CustomerDetailPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [customers] = useAtom(customersAtom);
    const [papers, setPapers] = useAtom(papersAtom);
    const customer = customers.find((customer: any) => customer.id === parseInt(id || '', 10));
    const [orders, setOrders] = useState([]);
    const [basket, setBasket] = useState<{ name: string, price: number, quantity: number }[]>([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        const getOrders = async () => {
            if (id) {
                const customerOrders = await fetchCustomerOrders(parseInt(id, 10));
                setOrders(customerOrders);
            }
        };
        getOrders();
    }, [id]);

    useEffect(() => {
        const getPapers = async () => {
            try {
                const data = await fetchPapers();
                setPapers(data);
            } catch (error) {
                console.error('Error fetching papers:', error);
            }
        };

        getPapers();
    }, [setPapers]);

    const addToBasket = (paper: { name: string, price: number }, quantity: number) => {
        const existingPaperIndex = basket.findIndex(item => item.name === paper.name);
        if (existingPaperIndex !== -1) {
            const updatedBasket = [...basket];
            updatedBasket[existingPaperIndex].quantity += quantity;
            setBasket(updatedBasket);
        } else {
            setBasket([...basket, { ...paper, quantity }]);
        }
        setTotalAmount(totalAmount + paper.price * quantity);
    };

    const handleQuantityChange = (paperId: number, quantity: number) => {
        setQuantities({ ...quantities, [paperId]: quantity });
    };

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
            <DropdownMenu title="View Papers" className="darker-dropdown">
                <ul>
                    {papers.map((paper: any) => (
                        <li key={paper.id}>
                            {paper.name}
                            <input
                                type="number"
                                value={quantities[paper.id] || 1}
                                onChange={(e) => handleQuantityChange(paper.id, parseInt(e.target.value, 10))}
                                min="1"
                            />
                            <button onClick={() => addToBasket({ name: paper.name, price: paper.price }, quantities[paper.id] || 1)}>+</button>
                        </li>
                    ))}
                </ul>
            </DropdownMenu>
            <h2>Basket</h2>
            <ul>
                {basket.map((paper, index) => (
                    <li key={index}>{paper.name} (x{paper.quantity})</li>
                ))}
            </ul>
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
        </div>
    );
};

export default CustomerDetailPage;