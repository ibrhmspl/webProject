import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productService from "../Services/productService";
const initialState = [];
export const postProduct = createAsyncThunk(
  "postProduct",
  async (item) => {
    console.log(item);
    const res = await productService.postProduct(item);
    return res;
  }
);
export const getProduct = createAsyncThunk(
  "getProduct",
  async () => {
    const res = await productService.product();
    return res;
  }
);
export const updateProduct = createAsyncThunk(
  "putProduct",
  async (item) => {
    const res = await productService.putProduct(item);
    console.log(res);
    return res;
  }
);
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (productId) => {
    await productService.deleteProduct(productId);
    return productId ;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [postProduct.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [getProduct.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateProduct.fulfilled]: (state, action) => {
      const index = state.findIndex((item) => item === action.payload);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteProduct.fulfilled]: (state, action) => {
      let index = state.findIndex((productId) => productId === action.payload.id);
      state.splice(index, 1);
    },
  },
});
const { reducer } = productSlice;
export default reducer;