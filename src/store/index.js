const { configureStore } = require("@reduxjs/toolkit");
const { default: cartSlice } = require("./cart-slice");
const { default: uiSlice } = require("./ui-slice");

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;