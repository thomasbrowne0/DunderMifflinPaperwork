import axios from 'axios';

const API_URL = 'http://localhost:5158/Order';
const ORDER_ENTRY_URL = 'http://localhost:5158/OrderEntry';

export const fetchCustomerOrders = async (customerId: number) => {
    const response = await axios.get(`${API_URL}/customer/${customerId}`);
    return response.data;
};

export const createOrder = async (order: any) => {
    const response = await axios.post(API_URL, order);
    return response.data;
};

export const createOrderEntry = async (orderEntry: any) => {
    await axios.post(ORDER_ENTRY_URL, orderEntry);
};