export type CheckoutQueryOptions = {
    [prop: string]: any;
    _idQuery?: string;
    userQuery?: string;
    userIdQuery?: string;
    productsQuery?: string;
    phoneNumberQuery?: string;
    sortDate?: boolean;
    sortPaymentMethod?: string;
    sortStatus?: string;
    sortTotal?: string;
};
