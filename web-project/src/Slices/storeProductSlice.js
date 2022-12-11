import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as storeProductService from "../Services/storeProductService";
const initialState = [];
export const postStoreProduct = createAsyncThunk(
  "postStoreProduct",
  async (item) => {
    const res = await storeProductService.postStoreProduct(item);
    return res;
  }
);
export const getStoreProduct = createAsyncThunk(
  "getStoreProduct",
  async () => {
    const res = await storeProductService.storeProduct();
    return res;
  }
);
export const updateStoreProduct = createAsyncThunk(
    "putStoreProduct",
    async (id) => {
      const res = await storeProductService.putStoreProduct(id);
      console.log(res);
      return res;
    }
  );
export const deleteStoreProduct = createAsyncThunk(
  "deleteStoreProduct",
  async (productId) => {
    await storeProductService.deleteStoreProduct(productId);
    return productId ;
  }
);

const storeProductSlice = createSlice({
  name: "storeProduct",
  initialState,
  extraReducers: {
    [postStoreProduct.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [getStoreProduct.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateStoreProduct.fulfilled]: (state, action) => {
        const index = state.findIndex((item) => item === action.payload);
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      },
    [deleteStoreProduct.fulfilled]: (state, action) => {
      let index = state.findIndex((productId) => productId === action.payload.id);
      state.splice(index, 1);
    },
  },
});
const { reducer } = storeProductSlice;
export default reducer;