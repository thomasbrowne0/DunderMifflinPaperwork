import axios from 'axios';

const API_URL = 'http://localhost:5158/Customer';

export const fetchCustomers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchCustomer = async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};