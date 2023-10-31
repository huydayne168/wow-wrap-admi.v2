export type ProductQueryOptions = {
    [key: string]: any;

    _idQuery?: string;
    nameQuery?: string;
    category?: string;
    sortRate?: string | boolean;
    sortPrice?: string | boolean;
    sortFlashSale?: boolean;
    page?: number;
};
