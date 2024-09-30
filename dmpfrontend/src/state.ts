﻿import { atom } from 'jotai';
import {Api} from './Api.ts';

export interface Order {
    id: number;
    status: string;
}

export interface Customer {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
}

export const MyApi = new Api('http://localhost:5088/api');
export const ordersAtom = atom<Order[]>([]);
export const customersAtom = atom<Customer[]>([]);

export const fetchOrders = async (): Promise<Order[]> => {
    const response = await fetch(MyApi.url + '/Order');
    return response.json();
};

export const fetchCustomers = async (): Promise<Customer[]> => {
    const response = await fetch('http://localhost:5088/api/Customer');
    return response.json();
};

export const createCustomer = async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
    const response = await fetch('http://localhost:5088/api/customer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    });
    console.log(response);
    return response.json();
};