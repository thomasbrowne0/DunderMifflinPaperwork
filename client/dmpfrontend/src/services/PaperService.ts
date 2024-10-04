import axios from 'axios';

const API_URL = 'http://localhost:5158/Paper';
const PAPER_PROPERTY_API_URL = 'http://localhost:5158/PaperProperty';

export const fetchPapers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchPaper = async (id: number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createPaper = async (request: { name: string; discontinued: boolean; stock: number; price: number, propertyName?: string }) => {
    const response = await axios.post(API_URL, request);
    return response.data;
};

export const createPaperProperty = async (paperProperty: { paperId: number; propertyId: number }) => {
    const response = await axios.post(PAPER_PROPERTY_API_URL, paperProperty);
    return response.data;
};

export const fetchPaperProperty = async (paperId: number, propertyId: number) => {
    const response = await axios.get(`${PAPER_PROPERTY_API_URL}/${paperId}/${propertyId}`);
    return response.data;
};