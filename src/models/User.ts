import { type } from "os";
import { Cart } from "./Cart";
import { Checkout } from "./Checkout";

export type User = {
    _id: string;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    refreshToken?: string;
    roleId: any;
    cart: Cart[];
    checkout: Checkout[];
};
