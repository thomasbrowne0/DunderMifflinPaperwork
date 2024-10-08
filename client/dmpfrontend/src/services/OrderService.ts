import axios from 'axios';

const API_URL = 'http://localhost:5158/Order';

export const fetchCustomerOrders = async (customerId: number) => {
    const response = await axios.get(`${API_URL}/customer/${customerId}`);
    return response.data;
};