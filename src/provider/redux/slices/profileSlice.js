import { axiosInstance } from "@/api/base";
import authHeader from "@/helpers/jwt-token-access/auth-token-header";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

export const getProfile = createAsyncThunk("/Profile/getProfile", async () => {
  try {
    const response = await axiosInstance.get(`profile`, {
      headers: authHeader(),
    });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    resetProfile: (state) => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        console.log("api/lender", action.payload);
        state.lenders = action.payload;
        state.status = action.payload.status;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
