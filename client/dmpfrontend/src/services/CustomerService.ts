import axios from "axios";
import { Customer } from "./Api";

const apiBaseUrl = 'http://localhost:5088';

export const fetchAllCustomers = async (): Promise<Customer[] >=> {
    const response = await axios.get(`${apiBaseUrl}/api/Customer`);
    return response.data();
}
