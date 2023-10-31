import { User } from "./User";
import { Product } from "./Product";

export type Checkout = {
    products: [
        {
            _id: string;
            product: Product;
            quantity: number;
        }
    ];
    receiverName: string;
    date: string;
    address: string;
    phoneNumber: string;
    paymentMethod: string;
    status: string;
    total: number;
    user: User;
    _id: string;
};
