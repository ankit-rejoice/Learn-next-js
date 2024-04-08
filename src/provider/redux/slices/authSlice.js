import { axiosInstance } from "@/api/base";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



import { toast } from "react-toastify";



const initialState = {
  user: null,
  userData: null,
  isLoggedIn: false,
  errorSignIn: false,
  status: "idle",
  error: null,
  isVisitor: false,
  visitingUser: null,
};

export const signUp = createAsyncThunk(
  "/authentication/signup",
  async (body) => {
    try {
      const response = await axiosInstance.post(`register`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const logIn = createAsyncThunk("/authentication/login", async (body) => {
  try {
    const response = await axiosInstance.post(`login`, body);
    toast.success("Login Successful");
    return response.data;
  } catch (e) {
    toast.error(e?.response?.data?.message);
    return e.response.data;
  }
});

export const verifyOTP = createAsyncThunk(
  "/authentication/verify/otp",
  async (body) => {
    try {
      const response = await axiosInstance.post(`user-verify-otp`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "/authentication/reset/password",
  async (body) => {
    try {
      const response = await axiosInstance.post(`api/password-reset`, body);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const getProfile = createAsyncThunk(
  "/authentication/getProfile",
  async () => {
    try {
      const response = await axiosInstance.post(`profile`);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);

export const sendOTP = createAsyncThunk(
  "/authentication/sendOTP",
  async (body) => {
    try {
      const response = await axiosInstance.post(`send-otp`, body);
      toast.success("OTP sent successfully");
      return response.data;
    } catch (e) {
      toast.error(e?.response?.data?.message);
      return e.response.data;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "/authentication/forgotPassword",
  async (body) => {
    try {
      const response = await axiosInstance.post(`forgot-password`, body);
      toast.success("Password Changed seccesfully");
      return response.data;
    } catch (e) {
      toast.error(e?.response?.data?.message);
      return e.response.data;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    resetAuth: (state) => initialState,
    setUpdatedUser(state, action) {
      state.user = action.payload;
    },

    setAutoLogin(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.status = "succeeded";
      state.error = null;
    },

    logout(state, action) {
      state.user = "";
      state.isLoggedIn = false;
      state.status = "";
      state.error = null;
    },

    setVisitor: (state, action) => {
      state.visitingUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const token = action?.payload?.payload?.token;
        let userInfo = {
          ...action?.payload?.payload,
          accessToken: token,
          refreshToken: token,
          role: action?.payload?.payload?.role,
          fullName:
            action?.payload?.payload?.firstName +
            " " +
            action?.payload?.payload?.lastName,
        };
        if (token) {
          state.isVisitor = false;
          state.visitingUser = action?.payload?.payload;
          state.user = userInfo;
          state.isLoggedIn = true;
          state.userData = userInfo;
          state.status = "succeeded";
          localStorage.setItem("accessToken", JSON.stringify(token));
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(logIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        console.log("action?", action?.payload);
        const token = action?.payload?.token;
        let userInfo = {
          accessToken: token?.accessToken,
          refreshToken: token?.refreshToken,

          email: action?.payload?.email,
        };

        if (token) {
          state.isVisitor = false;
          state.isLoggedIn = true;
          state.user = userInfo;
          state.status = "succeeded";

          
          localStorage.setItem("currUser", JSON.stringify(userInfo));
          localStorage.setItem("Token", JSON.stringify(token));
          localStorage.setItem(
            "accessToken",
            JSON.stringify(token?.accessToken)
          );
          localStorage.setItem(
            "refressToken",
            JSON.stringify(token?.refreshToken)
          );
        }
      })
      .addCase(logIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        console.log("action?", action?.payload);
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        if (action?.payload?.Verified) {
          state.email = action?.payload?.email;
          state.otp = action?.payload?.OTP;
          state.otp_verified = action?.payload?.Verified;

          localStorage.setItem(
            "verified_email",
            JSON.stringify(action?.payload?.email)
          );
          localStorage.setItem(
            "verified_otp",
            JSON.stringify(action?.payload?.OTP)
          );
        }
        state.status = "succeeded";
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  resetAuth,
  setUpdatedUser,
  setAutoLogin,
  setVisitor,
  setBackToDashboard,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
