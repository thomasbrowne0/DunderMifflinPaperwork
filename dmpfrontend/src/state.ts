import { atom } from 'jotai';

export interface Order {
    id: number;
    status: string;
}

export interface Customer {
    id: number;
    name: string;
}

export const ordersAtom = atom<Order[]>([]);
export const customersAtom = atom<Customer[]>([]);

export const fetchOrders = async (): Promise<Order[]> => {
    const response = await fetch('/api/orders');
    return response.json();
};

export const fetchCustomers = async (): Promise<Customer[]> => {
    const response = await fetch('/api/customers');
    return response.json();
};