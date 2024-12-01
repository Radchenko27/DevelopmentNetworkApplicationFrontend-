import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  driverName: "",
};
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDriverName(state, action) {
      state.minPrice = action.payload;
    },
  },
});
export const { setDriverName } = dataSlice.actions;
export default dataSlice.reducer;
