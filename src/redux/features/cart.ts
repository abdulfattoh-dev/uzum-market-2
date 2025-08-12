import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartProduct, IProduct } from "../../types";

interface ICard {
    value: ICartProduct[]
}

const initialState: ICard = {
    value: JSON.parse(localStorage.getItem('cart') || '[]') || []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, actions: PayloadAction<IProduct>) => {
            const index = state.value.findIndex((product) => product.id == actions.payload.id)

            if (index < 0) {
                state.value.push({ ...actions.payload, amount: 1 })
            }

            localStorage.setItem('cart', JSON.stringify(state.value))
        },
        deleteFromCart: (state, actions: PayloadAction<IProduct>) => {
            const index = state.value.findIndex((product) => product.id == actions.payload.id)
            state.value.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(state.value))
        },
        incAmount: (state, actions: PayloadAction<IProduct>) => {
            state.value = state.value.map((product) => product.id == actions.payload.id ? { ...product, amount: product.amount + 1 } : product)
            localStorage.setItem('cart', JSON.stringify(state.value))
        },
        decAmount: (state, actions: PayloadAction<IProduct>) => {
            state.value = state.value.map((product) => product.id == actions.payload.id ? { ...product, amount: product.amount - 1 } : product)
            localStorage.setItem('cart', JSON.stringify(state.value))
        },

    }
})

export const { addToCart, deleteFromCart, incAmount, decAmount } = cartSlice.actions
export default cartSlice.reducer