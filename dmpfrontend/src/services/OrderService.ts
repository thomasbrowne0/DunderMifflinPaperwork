import axios from "axios";
import { Order } from "./Api.ts";

const apiBaseUrl = 'http://localhost:5088';


export const fetchOrders = async (): Promise<Order[]> => {
    const response = await axios.get(`${apiBaseUrl}/api/Order`);
    return response.data();
};