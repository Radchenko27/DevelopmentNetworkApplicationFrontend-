import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../api/Api";

const api = new Api();

interface Insurance {
  id: string;
  certificate_number: string;
  certificate_series: string;
  status: string;
  date_formation: string | null;
  date_completion: string | null;
  average_experience: number | null;
}

interface InsurancesState {
  insurances: Insurance[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InsurancesState = {
  insurances: [],
  isLoading: false,
  error: null,
};

export const fetchInsurancesList = createAsyncThunk(
  "insurances/fetchInsurancesList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.insurances.insurancesList();
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка при загрузке списка страховок");
    }
  }
);

const insurancesSlice = createSlice({
  name: "insurances",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsurancesList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInsurancesList.fulfilled, (state, action) => {
        state.insurances = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchInsurancesList.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export default insurancesSlice.reducer;