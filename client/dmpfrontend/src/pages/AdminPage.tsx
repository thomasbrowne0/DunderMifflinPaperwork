import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import DropdownMenu from './components/DropdownMenu';
import CreateProductForm from './components/CreateProductForm';
import { fetchPapers } from '../services/PaperService';
import { fetchAllOrders } from '../services/OrderService';
import { papersAtom, allOrdersAtom } from '../atoms/Atoms';
import '../index.css'; // Import the CSS file

const AdminPage: React.FC = () => {
    const [papers, setPapers] = useAtom(papersAtom);
    const [allOrders, setAllOrders] = useAtom(allOrdersAtom);

    useEffect(() => {
        const getPapers = async () => {
            try {
                const data = await fetchPapers();
                setPapers(data);
            } catch (error) {
                console.error('Error fetching papers:', error);
            }
        };

        const getAllOrders = async () => {
            try {
                const data = await fetchAllOrders();
                setAllOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        getPapers();
        getAllOrders();
    }, [setPapers, setAllOrders]);

    return (
        <div>
            <NavBar />
            <h1>All Papers</h1>
            <ul>
                {papers.map((paper: any) => (
                    <li key={paper.id}>
                        <Link to={`/paper/${paper.id}`}>{paper.name}</Link>
                    </li>
                ))}
            </ul>
            <h1>Order History</h1>
            <ul>
                {allOrders.map((order: any) => (
                    <li key={order.id}>
                        <p>Order Date: {order.orderDate}</p>
                        <p>Customer ID: {order.customerId}</p>
                        <p>Status: {order.status}</p>
                        <p>Total Amount: ${order.totalAmount}</p>
                    </li>
                ))}
            </ul>
            <h1>Admin Page</h1>
            <p>Welcome to the Admin Page!</p>
            <DropdownMenu title="Create Product?" className="darker-dropdown">
                <CreateProductForm />
            </DropdownMenu>
            {/* Add more buttons and dropdown menus as needed */}
        </div>
    );
};

export default AdminPage;