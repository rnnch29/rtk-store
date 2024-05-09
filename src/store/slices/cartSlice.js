import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("cartItems");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};


const saveState = (state) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartItems", serializedState);
};

const initialState = loadState() || {
    cartItems: [],
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add(state, action) {
            const check = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (check !== -1) {
                state.cartItems[check].qty += action.payload.qty;
            } else {
                state.cartItems.push(action.payload);
            }
            state.total = state.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
            saveState(state);
        },
        remove(state, action) {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            state.total = state.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
            saveState(state);
        },
        decrease(state, action) {
            const check = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (check !== -1) {
                state.cartItems[check].qty -= action.payload.qty;
            }
            state.total = state.cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
            saveState(state);
        },
    },
});

export const { add, remove, decrease } = cartSlice.actions;
export default cartSlice.reducer;
