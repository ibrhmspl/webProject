import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as storeService from "../Services/storeService";
const initialState = [];
export const postStore = createAsyncThunk(
  "postStore",
  async ({name, email, adress, tel}) => {
    console.log({name, email, adress,tel});
    const res = await storeService.postStore({name, email, adress, tel});
    return res;
  }
);
export const getStore = createAsyncThunk(
  "getStore",
  async () => {
    const res = await storeService.store();
    return res;
  }
);
export const updateStore = createAsyncThunk(
  "putStore",
  async (item) => {
    const res = await storeService.putStore(item);
    console.log(res);
    return res;
  }
);
export const deleteStore = createAsyncThunk(
  "deleteStore",
  async (productId) => {
    await storeService.deleteStore(productId);
    return productId ;
  }
);

const storeSlice = createSlice({
  name: "store",
  initialState,
  extraReducers: {
    [postStore.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [getStore.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateStore.fulfilled]: (state, action) => {
      const index = state.findIndex((item) => item === action.payload);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteStore.fulfilled]: (state, action) => {
      let index = state.findIndex((productId) => productId === action.payload.id);
      state.splice(index, 1);
    },
  },
});
const { reducer } = storeSlice;
export default reducer;