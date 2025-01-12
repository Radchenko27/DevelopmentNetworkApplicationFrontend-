
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../api/Api";

const api = new Api();
interface Driver {
  id: string;
  name: string;
  experience: number;
  image_url: string;
}

interface InsuranceDetails {
  id: string;
  type: string;
  status: string;
  certificate_number: string;
  certificate_series: string;
  drivers: { driver: Driver }[];
}

interface InsuranceState {
  insuranceDetails: InsuranceDetails | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InsuranceState = {
  insuranceDetails: null,
  isLoading: false,
  error: null,
};

export const fetchInsuranceDetails = createAsyncThunk(
  "insurance/fetchInsuranceDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.insurances.insurancesRead();
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка при загрузке данных о страховке");
    }
  }
);

export const updateInsuranceDetails = createAsyncThunk(
  "insurance/updateInsuranceDetails",
  async (
    { field, value }: { field: string; value: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as { insurance: InsuranceState };
      const { insuranceDetails } = state.insurance;

      if (!insuranceDetails || !insuranceDetails.id) {
        throw new Error("Отсутствует ID страховки");
      }

      const updatedDetails = {
        ...insuranceDetails,
        [field]: value,
      };

      const response = await api.insurances.insurancesSubmitUpdate(
        insuranceDetails.id,
        updatedDetails
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка при обновлении данных страховки");
    }
  }
);

export const deleteDriver = createAsyncThunk(
  "insurance/deleteDriver",
  async (
    { insuranceId, driverId }: { insuranceId: string; driverId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.insurances.insurancesDriversDeleteDelete(
        insuranceId,
        driverId
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка при удалении водителя");
    }
  }
);

export const updateDriver = createAsyncThunk(
  "insurance/updateDriver",
  async (
    { insuranceId, driverId }: { insuranceId: string; driverId: string },
    { rejectWithValue }
  ) => {
    try {
      const owner = { owner: true };
      const response = await api.insurances.insurancesDriversUpdateUpdate(
        insuranceId,
        driverId,
        owner
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка при обновлении данных водителя");
    }
  }
);

export const submitInsurance = createAsyncThunk(
  "insurance/submitInsurance",
  async (insuranceId: string, { rejectWithValue }) => {
    try {
      const response = await api.insurances.insurancesSubmitUpdate(insuranceId);
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка при оформлении страховки");
    }
  }
);

export const deleteInsurance = createAsyncThunk(
  "insurance/deleteInsurance",
  async (insuranceId: string, { rejectWithValue }) => {
    try {
      const response = await api.insurances.insurancesDeleteDelete(insuranceId);
      return response.data;
    } catch (error) {
      return rejectWithValue("Ошибка при удалении страховки");
    }
  }
);

const insuranceSlice = createSlice({
  name: "insurance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsuranceDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInsuranceDetails.fulfilled, (state, action) => {
        state.insuranceDetails = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchInsuranceDetails.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      .addCase(updateInsuranceDetails.fulfilled, (state, action) => {
        state.insuranceDetails = action.payload;
      })
      .addCase(updateInsuranceDetails.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(deleteDriver.fulfilled, (state, action) => {
        state.insuranceDetails = action.payload;
      })
      .addCase(deleteDriver.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(updateDriver.fulfilled, (state, action) => {
        state.insuranceDetails = action.payload;
      })
      .addCase(updateDriver.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(submitInsurance.fulfilled, (state, action) => {
        state.insuranceDetails = action.payload;
      })
      .addCase(submitInsurance.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(deleteInsurance.fulfilled, (state) => {
        state.insuranceDetails = null;
      })
      .addCase(deleteInsurance.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default insuranceSlice.reducer;
