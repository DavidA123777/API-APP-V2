import { configureStore } from '@reduxjs/toolkit';
import parliamentReducer from '../slices/ParliamentSlice';
import congressReducer from '../slices/CongressSlice';

const Store = configureStore({
  reducer: {
    parliament: parliamentReducer,
    congress: congressReducer
  },
});
export default Store;