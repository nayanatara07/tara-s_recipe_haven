import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.recipe_id === action.payload.recipe_id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.count += 1;
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.recipe_id === action.payload.recipe_id
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.recipe_id !== action.payload.recipe_id
          );
        }
        state.count -= 1;
      }
    },
    increment: (state) => {
      state.count += 1;
    },
    clearCart: (state) => {
      state.items = [];
      state.count = 0;
    },
    addAllToCart: (state, action) => {
      action.payload.forEach((newItem) => {
        let item = {
          recipe_id: newItem.dish_id,
          title: newItem.name,
          publisher: newItem.publisher,
          image_url: newItem.image,
          quantity: newItem.quantity,
        };
        state.items.push({ ...item });

      });


      state.count = action.payload.length;
    }
  }
});

export const { addToCart, removeFromCart, increment, clearCart, addAllToCart } = cartSlice.actions;

export default cartSlice.reducer;
