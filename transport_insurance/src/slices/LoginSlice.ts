import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../api/Api";

const api = new Api();

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  sessionId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
  sessionId: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.users.usersLoginCreate({ email, password });

      if (response.data?.session_id) {
        document.cookie = `session_id=${response.data.session_id}; path=/; SameSite=Strict`;
        return { username: email, sessionId: response.data.session_id };
      }

      return rejectWithValue("Неверный email или пароль");
    } catch (error) {
      return rejectWithValue("Ошибка при выполнении входа. Попробуйте позже.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.username = null;
      state.sessionId = null;
      document.cookie =
        "session_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.username = action.payload.username;
        state.sessionId = action.payload.sessionId;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
