import { configureStore } from "@reduxjs/toolkit";
import wishes from "./features/wishes";
import cart from "./features/cart";

export const store = configureStore({
    reducer: {
        wishes,
        cart
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch