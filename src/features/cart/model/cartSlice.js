import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existing = state.find((item) => item.id === action.payload.id)
      if (existing) existing.count += 1
      else state.push({ ...action.payload, count: 1 })
    },
    clearCart: () => [],
  },
})

export const { addToCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
