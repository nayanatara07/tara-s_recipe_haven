import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  count: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload]
      state.count += 1;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.recipe_id !== action.payload.recipe_id);
      state.count -= 1;
    },
    increment: (state) => {
      state.count += 1;
    }
  },
});

export const { addToCart, removeFromCart, increment } = cartSlice.actions;

export default cartSlice.reducer;
