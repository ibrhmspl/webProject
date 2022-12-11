import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as tmpStoreService from "../Services/tmpStoreService";
const initialState = [];

export const postTmpStore = createAsyncThunk(
  "postTmpStore",
  async ({name, email, adress, tel}) => {
    console.log({name, email, adress,tel});
    const res = await tmpStoreService.postTmpStore({name, email, adress, tel});
    return res;
  }
);
export const getTmpStore = createAsyncThunk(
  "getTmpStore",
  async () => {
    const res = await tmpStoreService.tmpstore();
    return res;
  }
);
export const updateTmpStore = createAsyncThunk(
    "putTmpStore",
    async (id) => {
      const res = await tmpStoreService.putTmpStore(id);
      console.log(res);
      return res;
    }
  );
export const deleteTmpStore = createAsyncThunk(
  "deleteTmpStore",
  async (productId) => {
    await tmpStoreService.deleteTmpStore(productId);
    return productId ;
  }
);

const tmpStoreSlice = createSlice({
  name: "tmpstore",
  initialState,
  extraReducers: {
    [postTmpStore.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [getTmpStore.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateTmpStore.fulfilled]: (state, action) => {
        const index = state.findIndex((id) => id === action.payload);
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      },
    [deleteTmpStore.fulfilled]: (state, action) => {
      let index = state.findIndex((id) => id === action.payload.id);
      state.splice(index, 1);
    },
  },
});
const { reducer } = tmpStoreSlice;
export default reducer;