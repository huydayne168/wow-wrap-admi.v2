import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Product } from "../models/Product";
import { Checkout } from "../models/Checkout";
import { Tag } from "../models/Tag";
import { CheckoutQueryOptions } from "../models/CheckoutQueryOptions";
import { UserQueryOptions } from "../models/UserQueryOptions";
import { ProductQueryOptions } from "../models/ProductQueryOptions";
import { Category } from "../models/Category";
import { FlashSaleQueryOptions } from "../models/FlashSaleQueryOptions";
import { VoucherQueryOptions } from "../models/VoucherQueryOptions";

////// Navigation Slice:
const navigationInit =
    sessionStorage.getItem("navigationState") || "dash-board";

const navigationSlice = createSlice({
    name: "navigation",
    initialState: navigationInit,
    reducers: {
        setNavigationState(state, action) {
            sessionStorage.setItem("navigationState", action.payload);
            return (state = action.payload);
        },
    },
});

export const navigationActions = navigationSlice.actions;

////// Loading State:
const loadingInit = false;

const loadingSlice = createSlice({
    name: "loading",
    initialState: loadingInit,
    reducers: {
        setLoading(state, action) {
            return (state = action.payload);
        },
    },
});

export const loadingActions = loadingSlice.actions;

////// Authentication store:
const id = localStorage.getItem("currentUserId");
let authInit = {
    _id: id || "",
    accessToken: "",
};

const authentication = createSlice({
    name: "authentication",
    initialState: authInit,
    reducers: {
        storeUser(state, action) {
            localStorage.setItem("currentUserId", action.payload._id);
            return (state = {
                _id: action.payload._id,
                accessToken: action.payload.accessToken,
            });
        },

        storeNewAccessToken(state, action) {
            const newState = { ...state, accessToken: action.payload };
            return (state = newState);
        },

        logout(state) {
            state = {
                _id: "",
                accessToken: "",
            };
            localStorage.removeItem("currentUserId");
        },
    },
});

export const authActions = authentication.actions;

////// Tags store:
type TagsSlice = {
    allTags: Tag[];
    choseTags: Tag[];
};

let tagsInit: TagsSlice = {
    allTags: [],
    choseTags: [],
};

const tagsSlice = createSlice({
    name: "tagsSlice",
    initialState: tagsInit,
    reducers: {
        fetchAllTags(state, action) {
            state.allTags = action.payload;
        },
    },
});
export const tagsActions = tagsSlice.actions;

////// Categories Store
let categoriesInit: Category[] = [];

const categoriesSlice = createSlice({
    name: "tagsSlice",
    initialState: categoriesInit,
    reducers: {
        fetchAllCategories(state, action) {
            return (state = action.payload);
        },
    },
});
export const categoriesActions = categoriesSlice.actions;

////// Products store: (this slice is used too manage products and sort products)
const intiProducts: Product[] = [];

const productsSlice = createSlice({
    name: "products",
    initialState: intiProducts,
    reducers: {
        setProducts(state, action) {
            return (state = action.payload);
        },

        deleteProduct(state, action) {
            const newState = state.filter(
                (product) => product._id !== action.payload
            );
            return (state = newState);
        },
    },
});

export const productsAction = productsSlice.actions;

////// checkouts store: (this slice is used too manage checkouts and sort checkouts)
const intiCheckouts: Checkout[] = [];

const checkoutsSlice = createSlice({
    name: "checkouts",
    initialState: intiCheckouts,
    reducers: {
        setCheckouts(state, action) {
            return (state = action.payload);
        },

        deleteCheckout(state, action) {
            const newState = state.filter(
                (checkout) => checkout._id !== action.payload
            );
            return (state = newState);
        },

        updateStatus(state, action) {
            const newState = state.map((checkout) => {
                if (checkout._id === action.payload.checkout._id) {
                    return { ...checkout, status: action.payload.status };
                }
                return checkout;
            });
            return newState;
        },
    },
});

export const checkoutsAction = checkoutsSlice.actions;

////// Checkouts query options:
const checkoutQueryOptionsInit: CheckoutQueryOptions = {
    sortDate: true,
};

const checkoutQueryOptionsSlice = createSlice({
    name: "checkoutQueryOptions",
    initialState: checkoutQueryOptionsInit,
    reducers: {
        setQueryOptions(state, action) {
            state[action.payload.key] = action.payload.value;
        },
        reset(state) {
            return (state = checkoutQueryOptionsInit);
        },
    },
});
export const checkoutQueryOptionsActions = checkoutQueryOptionsSlice.actions;

////// User Query Options:
const userQueryOptionsInit: UserQueryOptions = {};

const userQueryOptionsSlice = createSlice({
    name: "userQueryOptions",
    initialState: userQueryOptionsInit,
    reducers: {
        setQueryOptions(state, action) {
            state[action.payload.key] = action.payload.value;
        },

        reset(state) {
            return (state = userQueryOptionsInit);
        },
    },
});

export const userQueryOptionsActions = userQueryOptionsSlice.actions;

////// Product Query Options:
const productQueryOptionsInit: ProductQueryOptions = {
    page: 1,
};

const productQueryOptionsSlice = createSlice({
    name: "productQueryOptions",
    initialState: productQueryOptionsInit,
    reducers: {
        setQueryOptions(state, action) {
            state[action.payload.key] = action.payload.value;
        },

        reset(state) {
            return (state = productQueryOptionsInit);
        },
    },
});

export const productQueryOptionsActions = productQueryOptionsSlice.actions;

////// Flash sale Query Options:
const flashSaleQueryOptionsInit: FlashSaleQueryOptions = {
    page: 1,
};

const flashSaleQueryOptionsSlice = createSlice({
    name: "flashSaleQueryOptions",
    initialState: flashSaleQueryOptionsInit,
    reducers: {
        setQueryOptions(state, action) {
            state[action.payload.key] = action.payload.value;
        },

        reset(state) {
            return (state = productQueryOptionsInit);
        },
    },
});

export const flashSaleQueryOptionsActions = flashSaleQueryOptionsSlice.actions;

////// Voucher Query Options:
const voucherQueryOptionsInit: VoucherQueryOptions = {
    page: 1,
};

const voucherQueryOptionsSlice = createSlice({
    name: "voucherQueryOptions",
    initialState: voucherQueryOptionsInit,
    reducers: {
        setQueryOptions(state, action) {
            state[action.payload.key] = action.payload.value;
        },

        reset(state) {
            return (state = productQueryOptionsInit);
        },
    },
});

export const voucherQueryOptionsActions = voucherQueryOptionsSlice.actions;

const store = configureStore({
    reducer: {
        navigation: navigationSlice.reducer,
        loading: loadingSlice.reducer,
        authentication: authentication.reducer,
        tagsSlice: tagsSlice.reducer,
        categoriesSlice: categoriesSlice.reducer,
        products: productsSlice.reducer,
        checkouts: checkoutsSlice.reducer,
        checkoutQueryOptions: checkoutQueryOptionsSlice.reducer,
        userQueryOptions: userQueryOptionsSlice.reducer,
        productQueryOptions: productQueryOptionsSlice.reducer,
        flashSaleQueryOptions: flashSaleQueryOptionsSlice.reducer,
        voucherQueryOptions: voucherQueryOptionsSlice.reducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
