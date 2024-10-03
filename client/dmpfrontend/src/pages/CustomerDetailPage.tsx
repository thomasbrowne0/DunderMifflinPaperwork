import React from 'react';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { customersAtom } from '../atoms/Atoms';
import NavBar from './components/NavBar';

const CustomerDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [customers] = useAtom(customersAtom);
    const customer = customers.find((customer: any) => customer.id === parseInt(id));

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
        </div>
    );
};

export default CustomerDetailPage;