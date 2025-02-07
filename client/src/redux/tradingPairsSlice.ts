import { createSlice } from '@reduxjs/toolkit';

const tradingPairsSlice = createSlice({
  name: 'tradingPairs',
  initialState: [],
  reducers: {
    setTradingPairs: (state, action) => action.payload,
  },
});

export const { setTradingPairs } = tradingPairsSlice.actions;

export default tradingPairsSlice.reducer;