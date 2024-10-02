import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { customersAtom } from '../atoms/Atoms';
import { fetchCustomers } from '../services/CustomerService';
import NavBar from './components/NavBar';

const CustomerPage: React.FC = () => {
    const [customers, setCustomers] = useAtom(customersAtom);

    useEffect(() => {
        const getCustomers = async () => {
            const data = await fetchCustomers();
            setCustomers(data);
        };

        getCustomers();
    }, [setCustomers]);

    return (
        <div>
            <NavBar />
            <h1>Customer Page</h1>
            <p>Welcome to the Customer Page!</p>
            <ul>
                {customers.map((customer: any) => (
                    <li key={customer.id}>{customer.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerPage;