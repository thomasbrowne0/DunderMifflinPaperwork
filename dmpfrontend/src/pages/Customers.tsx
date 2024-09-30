import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { customersAtom, fetchCustomers, createCustomer } from '../state';

const Customers: React.FC = () => {
    const [customers, setCustomers] = useAtom(customersAtom);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchCustomers()
            .then(setCustomers)
            .catch(error => console.error('Error fetching customers:', error));
    }, [setCustomers]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newCustomer = { name, address, phone, email };
        const createdCustomer = await createCustomer(newCustomer);
        setCustomers(prevCustomers => [...prevCustomers, createdCustomer]);
        setName('');
        setAddress('');
        setPhone('');
        setEmail('');
    };

    return (
        <div>
            <h1>Customers</h1>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>{customer.name}</li>
                ))}
            </ul>
            <h2>Create New Customer</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default Customers;