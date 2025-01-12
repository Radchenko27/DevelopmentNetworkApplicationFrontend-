import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Api } from '../api/Api'; // Импортируем API с кодогенерацией
import { Driver } from '../mock/mockData'; // Тип данных для водителя

// Инициализация API
const api = new Api();

// Создание асинхронного запроса с использованием thunk
export const fetchDriverById = createAsyncThunk<Driver, string, { rejectValue: string }>(
  'driver/fetchDriverById',
  async (idDriver, { rejectWithValue }) => {
    try {
      const response = await api.drivers.driversRead(idDriver); // Вызов метода API для получения данных
      return response.data; // Ответ от API
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке данных водителя');
    }
  }
);

// Интерфейс состояния
interface DriverState {
  driver: Driver | null;
  loading: boolean;
  error: string | null;
}

const initialState: DriverState = {
  driver: null,
  loading: false,
  error: null,
};

// Создание слайса
const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriverById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriverById.fulfilled, (state, action: PayloadAction<Driver>) => {
        state.loading = false;
        state.driver = action.payload;
      })
      .addCase(fetchDriverById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default driverSlice.reducer;