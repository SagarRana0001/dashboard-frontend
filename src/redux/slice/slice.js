import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    state: false,
    message: null,
    severity: null,
  },
};
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reduxSnackbar: (state, action) => {
      state.value.state = action.payload.state;
      state.value.message = action.payload.message;
      state.value.severity = action.payload.severity;
    },
  },
});
export const { reduxSnackbar } = counterSlice.actions;

export default counterSlice.reducer;
