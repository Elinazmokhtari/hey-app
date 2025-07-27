import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: undefined,
  },
  reducers: {
    handleSaveUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export default userSlice;
