import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICartProduct } from "../../types";

interface IWishes {
    value: ICartProduct[]
}

const initialState: IWishes = {
    value: []
}

export const wishesSlice = createSlice({
    name: 'wishes',
    initialState,
    reducers: {
        addToWishes: (state, actions: PayloadAction<ICartProduct>) => {
            const index = state.value.findIndex((product) => product.id == actions.payload.id)

            if (index < 0) {
                state.value.push(actions.payload)
            } else {
                state.value.splice(index, 1)
            }
        }
    }
})

export const { addToWishes } = wishesSlice.actions
export default wishesSlice.reducer