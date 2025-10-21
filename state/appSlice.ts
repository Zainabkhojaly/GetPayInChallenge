import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isLocked: boolean;
}

const initialState: AppState = {
  isLocked: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLocked: (state, action: PayloadAction<boolean>) => {
      state.isLocked = action.payload;
    },
  },
});

export const { setLocked } = appSlice.actions;
export default appSlice.reducer;
