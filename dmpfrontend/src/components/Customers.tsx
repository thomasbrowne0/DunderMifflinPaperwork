import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { customersAtom, fetchCustomers } from '../state';

const Customers: React.FC = () => {
    const [customers, setCustomers] = useAtom(customersAtom);

    useEffect(() => {
        fetchCustomers().then(setCustomers);
    }, [setCustomers]);

    return (
        <div>
            <h1>Customers</h1>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>{customer.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Customers;