import { uiSliceAction } from "./ui-slice";

const { createSlice } = require("@reduxjs/toolkit");

const initialCartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const foundItem = state?.items?.find((item) => item.id === newItem.id);
      state.changed = true;
      state.totalQuantity++;
      if (foundItem) {
        foundItem.quantity++;
        foundItem.totalPrice = foundItem.totalPrice + newItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const foundItem = state.items.find((item) => item.id === id);
      state.changed = true;
      state.totalQuantity--;
      if (foundItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else if (foundItem.quantity > 1) {
        foundItem.quantity--;
        foundItem.totalPrice = foundItem.totalPrice - foundItem.price;
      }
    },
    clearCart(state) {
      state = initialCartState;
    },
  },
});


export const cartActions = cartSlice.actions;

export default cartSlice;
