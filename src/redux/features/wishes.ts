import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../../types";

interface IWishes {
    value: IProduct[]
}

const initialState: IWishes = {
    value: []
}

export const wishesSlice = createSlice({
    name: 'wishes',
    initialState,
    reducers: {
        addToWishes: (state, actions: PayloadAction<IProduct>) => {
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