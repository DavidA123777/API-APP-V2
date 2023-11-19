import { createSlice } from '@reduxjs/toolkit';

const congressSlice = createSlice({
  name: 'congress',
  initialState: {
    memberInfo: null,
    treaty: null,
    error: null,
  },
  reducers: {
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
export default congressSlice.reducer;
