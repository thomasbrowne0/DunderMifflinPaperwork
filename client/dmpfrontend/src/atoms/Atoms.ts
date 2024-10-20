import { atom } from 'jotai';

// Customer atom
export const customersAtom = atom([]);
export const customerSelectedAtom = atom(null);

// Paper atom
export const papersAtom = atom([]);

// Orders atom
export const allOrdersAtom = atom([]);
export const ordersAtom = atom([]);
export const basketAtom = atom<{ id: number, name: string, price: number, quantity: number }[]>([]);
export const totalAmountAtom = atom(0);
export const quantitiesAtom = atom<{ [key: number]: number }>({});