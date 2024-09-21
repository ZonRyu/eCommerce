import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    totalQuantity: 0,
    totalPrice: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload
            const itemIndex = state.products.find((item) => item.id === newItem.id)
            if(itemIndex) {
                state.quantity += 1
                state.totalPrice += newItem.price
            } else {
                state.products.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }
            state.totalPrice += newItem.price
            state.totalQuantity += 1
        },
        removeFromCart(state, action) {
            const id = action.payload
            const findItem = state.products.find((item) => item.id === id)
            if (findItem){
                state.totalPrice -= findItem.price
                state.totalQuantity -= 1
                state.products = state.products.filter(item => item.id !== id)
            }
        }
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions

export default cartSlice.reducer