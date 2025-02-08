import { configureStore } from '@reduxjs/toolkit';
import tradingPairsReducer from './tradingPairsSlice';

const store = configureStore({
  reducer: {
    tradingPairs: tradingPairsReducer,
  },
});

export default store;
