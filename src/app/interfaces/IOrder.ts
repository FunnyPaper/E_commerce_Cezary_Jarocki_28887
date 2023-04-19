import { IProduct } from "./IProduct";

export interface IOrder {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    date: string;
    products: IProduct[];
}
