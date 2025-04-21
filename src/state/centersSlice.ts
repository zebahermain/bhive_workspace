// src/state/centersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Workspace } from '../types';

// Mock data URL (GitHub JSON file)
const API_URL = 'https://raw.githubusercontent.com/MujtabaKably/bhive-interview-project-data/main/data.json';

interface CentersState {
  list: Workspace[];
  selectedWorkspace: Workspace | null;
  loading: boolean;
  error: string | null;
}

const initialState: CentersState = {
  list: [],
  selectedWorkspace: null,
  loading: false,
  error: null,
};

export const fetchCenters = createAsyncThunk(
  'centers/fetchCenters',
  async () => {
    // In a real application, you would fetch from an actual API
    // For now, we'll use this mock data
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch centers');
    }
    const data = await response.json();
    return data as Workspace[];
  }
);

export const fetchWorkspaceById = createAsyncThunk(
  'centers/fetchWorkspaceById',
  async (id: string, { getState }) => {
    // Here we'll just filter from the already loaded list
    const state = getState() as { centers: CentersState };
    const workspace = state.centers.list.find(w => w.id === id);
    
    if (!workspace) {
      throw new Error('Workspace not found');
    }
    
    return workspace;
  }
);

const centersSlice = createSlice({
  name: 'centers',
  initialState,
  reducers: {
    setSelectedWorkspace: (state, action: PayloadAction<Workspace | null>) => {
      state.selectedWorkspace = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCenters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCenters.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCenters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch centers';
      })
      .addCase(fetchWorkspaceById.fulfilled, (state, action) => {
        state.selectedWorkspace = action.payload;
      });
  },
});

export const { setSelectedWorkspace } = centersSlice.actions;
export default centersSlice.reducer;