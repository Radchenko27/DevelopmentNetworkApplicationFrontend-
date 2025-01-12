import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../api/Api";

// Типы данных для пользователя
interface UserState {
  email: string | null;
  errorMessage: string | null;
  loading: boolean;
}

// Начальное состояние
const initialState: UserState = {
  email: null,
  errorMessage: null,
  loading: false,
};

// createAsyncThunk для асинхронного запроса
export const updateUser = createAsyncThunk(
  "profile/updateUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const api = new Api(); // Создаем экземпляр API
    try {
      const response = await api.users.usersUpdateUpdate({ email, password });
      return response.data; // Возвращаем данные из ответа
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Ошибка при обновлении данных.");
    }
  }
);

// Слайс профиля
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Дополнительные действия (если нужно)
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { setEmail } = profileSlice.actions;
export default profileSlice.reducer;