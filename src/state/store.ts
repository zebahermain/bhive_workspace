// src/state/store.ts
import { configureStore } from '@reduxjs/toolkit';
import centersReducer from './centersSlice';

export const store = configureStore({
  reducer: {
    centers: centersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;