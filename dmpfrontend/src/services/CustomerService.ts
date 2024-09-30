import axios from "axios";
import { Customer } from "./Api";

const apiBaseUrl = 'http://localhost:5088';

export const fetchAllCustomers = async (): Promise<Customer[] >=> {
    const response = await axios.get(`${apiBaseUrl}/api/Customer`);
    return response.data();
}

export const createCustomer = async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
    const response = await axios.post(`${apiBaseUrl}/api/customer`, customer,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response);
    return response.data();
}
