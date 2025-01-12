import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../api/Api";

const api = new Api();

interface RegisterState {
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: RegisterState = {
  isLoading: false,
  error: null,
  success: null,
};

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.users.usersRegisterCreate({ email, password });
      if (response.data?.email) {
        return "Регистрация прошла успешно! Теперь вы можете войти.";
      }
      return rejectWithValue(
        "Не удалось зарегистрировать пользователя. Попробуйте позже."
      );
    } catch (error) {
      return rejectWithValue("Ошибка при регистрации. Попробуйте позже.");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload as string;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default registerSlice.reducer;
