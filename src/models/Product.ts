import { Review } from "./Review";
import { FlashSale } from "./Flashsale";
export type Product = {
    name: string;
    _id: string;
    amount: number;
    price: number;
    rate: number;
    shortDescription: string;
    longDescription: string;
    category: {
        _id: string;
        name: string;
    };
    tags: [
        {
            _id: string;
            name: string;
        }
    ];
    reviews: Review[];
    flashSale: FlashSale[];
    salePrice: number | null;
    image: any;
};
