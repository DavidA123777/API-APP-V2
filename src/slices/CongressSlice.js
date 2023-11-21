import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit'; //new addition for the selector

const congressSlice = createSlice({
  name: 'congress', //u use this in store.js
  initialState: { //initial state of the slice of memberInfo, treaty & error
    memberInfo: null,
    treaty: null,
    error: null,
  },
  reducers: { //reducers define how the state is updated in response to actions so how the site changes as you set member info, treaties and when u uncounter an error
    setMemberInfo(state, action) {
      state.memberInfo = action.payload;
      state.error = null;
    },
    setTreaty(state, action) {
      state.treaty = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setMemberInfo, setTreaty, setError } = congressSlice.actions;
export const selectCongressMemberInfo = (state) => state.congress.memberInfo; //selector to get Congress member info
export default congressSlice.reducer;
