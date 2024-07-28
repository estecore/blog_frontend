import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { axiosInstance } from "@/axios";

interface AuthParams {
  fullName?: string;
  email: string;
  password: string;
}

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: AuthParams, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", params);
      return data;
    } catch (err) {
      console.error("Error fetching user data register:", err);
      return rejectWithValue("Failed to fetch user data register");
    }
  }
);

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: AuthParams, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", params);
      return data;
    } catch (err) {
      console.error("Error fetching user data login:", err);
      return rejectWithValue("Failed to fetch user data login");
    }
  }
);

export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/auth/me");
      return data;
    } catch (err) {
      console.error("Error fetching user data me:", err);
      return rejectWithValue("Failed to fetch user data me");
    }
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const selectAuth = (state: RootState) => !!state.auth.data;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
