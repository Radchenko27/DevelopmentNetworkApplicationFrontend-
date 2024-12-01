import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DriverNameState {
  driverName: string;
}

const initialState: DriverNameState = {
  driverName: " ",
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDriverName(state, action: PayloadAction<string>) {
      state.driverName = action.payload;
    },
  },
});

export const { setDriverName } = dataSlice.actions;

export default dataSlice.reducer;
