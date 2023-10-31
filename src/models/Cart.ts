import { Product } from "./Product";

type FoodInCart = {
    product: Product;
    quantity: number;
};

export type Cart = {
    _id: string;
    products: FoodInCart[];
};
