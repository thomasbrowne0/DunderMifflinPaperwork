import axios from "axios";
import { Order } from "./Api.ts";

const apiBaseUrl = 'http://localhost:5088';


export const fetchOrders = async (): Promise<Order[]> => {
    const response = await axios.get(`${apiBaseUrl}/api/Order`);
    return response.data();
};

export const createOrder = async (order: Order): Promise<Order> => {
    const response = await axios.post(`${apiBaseUrl}/api/Order`, order);
    return response.data();
}
