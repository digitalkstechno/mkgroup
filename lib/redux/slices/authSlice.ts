import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/axios';
import cookieCutter from 'cookie-cutter';

interface AuthState {
  user: any | null;
  admin: any | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  admin: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { identifier: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/login', credentials);
      const { token, data: user } = response.data;
      
      if (user.role !== 'user') {
        throw new Error('Access denied. Please use the Admin login portal.');
      }
      
      localStorage.setItem('mkgroup_token', token);
      cookieCutter.set('mkgroup_user_auth', 'true', { path: '/' });
      
      return { token, user };
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (credentials: { identifier: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/login', credentials);
      const { token, data: admin } = response.data;
      
      if (admin.role !== 'admin') {
        throw new Error('Access denied. Administrator privileges required.');
      }
      
      localStorage.setItem('mkgroup_token', token);
      cookieCutter.set('mkgroup_admin_auth', 'true', { path: '/' });
      
      return { token, admin };
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Admin login failed';
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.admin = null;
      state.isAuthenticated = false;
      localStorage.removeItem('mkgroup_token');
      cookieCutter.set('mkgroup_user_auth', 'false', { path: '/', expires: new Date(0) });
      cookieCutter.set('mkgroup_admin_auth', 'false', { path: '/', expires: new Date(0) });
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // User Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Admin Login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
