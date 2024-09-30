import { atom } from "jotai";
import { Customer } from "../state";

// Customer atoms
export const customersAtom = atom<Customer[]>([]);
export const customerSelected = atom<Customer | null>(null);

// Order atoms
