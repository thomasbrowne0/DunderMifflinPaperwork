import axios from 'axios';

const API_URL = 'http://localhost:5158/Paper';

export const fetchPapers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchPaper = async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createPaper = async (paper: { name: string; discontinued: boolean; stock: number; price: number }) => {
    const response = await axios.post(API_URL, paper);
    return response.data;
};