const { createSlice } = require("@reduxjs/toolkit");

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartVisible: false,
    notification: null,
  },
  reducers: {
    toggleCartView(state) {
      state.cartVisible = !state.cartVisible;
    },
    showNotification(state, action) {
      state.notification =
        action.payload === null ? null : { ...action.payload };
    },
  },
});

export const uiSliceAction = uiSlice.actions;

export default uiSlice;
