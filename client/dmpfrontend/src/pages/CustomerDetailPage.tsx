import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { customersAtom, papersAtom, ordersAtom, basketAtom, totalAmountAtom, quantitiesAtom } from '../atoms/Atoms';
import NavBar from './components/NavBar';
import DropdownMenu from './components/DropdownMenu';
import { fetchCustomerOrders, createOrder, createOrderEntry } from '../services/OrderService';
import { fetchPapers } from '../services/PaperService';

const CustomerDetailPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [customers] = useAtom(customersAtom);
    const [papers, setPapers] = useAtom(papersAtom);
    const [orders, setOrders] = useAtom(ordersAtom);
    const [basket, setBasket] = useAtom(basketAtom);
    const [totalAmount, setTotalAmount] = useAtom(totalAmountAtom);
    const [quantities, setQuantities] = useAtom(quantitiesAtom);
    const customer = customers.find((customer: any) => customer.id === parseInt(id || '', 10));

    const [filter, setFilter] = useState('');
    const [order, setOrder] = useState('name');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getOrders = async () => {
            if (id) {
                const customerOrders = await fetchCustomerOrders(parseInt(id, 10));
                setOrders(customerOrders);
            }
        };
        getOrders();
    }, [id, setOrders]);

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

    const addToBasket = (paper: { id: number, name: string, price: number }, quantity: number) => {
        const existingPaperIndex = basket.findIndex(item => item.id === paper.id);
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

    const handleCreateOrder = async () => {
        if (!customer) return;

        const order = {
            customerId: customer.id,
            orderDate: new Date().toISOString(),
            status: 'pending',
            totalAmount
        };

        try {
            const createdOrder = await createOrder(order);
            const orderEntries = basket.map(item => ({
                orderId: createdOrder.id,
                productId: item.id,
                quantity: item.quantity
            }));

            await Promise.all(orderEntries.map(entry => createOrderEntry(entry)));

            setBasket([]);
            setTotalAmount(0);
            alert('Order created successfully!');
        } catch (error) {
            alert('Failed to create order.');
        }
    };

    const filteredPapers = papers
        .filter(paper => paper.name.toLowerCase().includes(search.toLowerCase()))
        .filter(paper => filter === '' || paper.category === filter)
        .sort((a, b) => {
            if (order === 'name') {
                return a.name.localeCompare(b.name);
            } else if (order === 'price') {
                return a.price - b.price;
            }
            return 0;
        });

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
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                    </select>
                    <select value={order} onChange={(e) => setOrder(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                </div>
                <ul>
                    {filteredPapers.map((paper: any) => (
                        <li key={paper.id}>
                            {paper.name}
                            <input
                                type="number"
                                value={quantities[paper.id] || 1}
                                onChange={(e) => handleQuantityChange(paper.id, parseInt(e.target.value, 10))}
                                min="1"
                            />
                            <button onClick={() => addToBasket({ id: paper.id, name: paper.name, price: paper.price }, quantities[paper.id] || 1)}>+</button>
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
            <button onClick={handleCreateOrder}>Purchase</button>
        </div>
    );
};

export default CustomerDetailPage;