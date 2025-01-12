import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface DriverNameState {
  driverName: string;
  QuantityOfDrivers: number;
  draftInsuranceId: number | null;
}

const initialState: DriverNameState = {
  driverName: " ",
  QuantityOfDrivers: 0,
  draftInsuranceId: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDriverName(state, action: PayloadAction<string>) {
      state.driverName = action.payload;
    },
    setQuantityOfDrivers(state, action: PayloadAction<number>) {
      state.QuantityOfDrivers = action.payload;
    },
    setDraftInsuranceId(state, action: PayloadAction<number | null>) {
      state.draftInsuranceId = action.payload;
    },
    resetDataState(state) {
      state.driverName = " "; 
      state.QuantityOfDrivers = 0; 
      state.draftInsuranceId = null; 
    },
  },
});

export const {
  setDriverName,
  setQuantityOfDrivers,
  setDraftInsuranceId,
  resetDataState,
} = dataSlice.actions;

export default dataSlice.reducer;
