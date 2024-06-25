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
	},
});

export const { addToCart, removeFromCart, increment } =
	cartSlice.actions;

export default cartSlice.reducer;
