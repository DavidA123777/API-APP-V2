import { configureStore } from '@reduxjs/toolkit';
import parliamentReducer from '../slices/ParliamentSlice';
import congressReducer from '../slices/CongressSlice';

//a store is basically a container that holds the state of the entire application
//in this file ur creating redux store using reducers ie parliament reducer assigned to slice called parliament, same for congress
const Store = configureStore({ 
  reducer: {
    parliament: parliamentReducer,
    congress: congressReducer
  },
});
export default Store;