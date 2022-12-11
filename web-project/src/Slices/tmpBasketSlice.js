import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as storeTmpBasket from "../Services/tmpBasketService";
const initialState = [];
export const postTmpBasket = createAsyncThunk(
  "postTmpBasket",
  async ({store_id,product_id,price,stock}) => {
    const res = await storeTmpBasket.postTmpBasket({store_id,product_id,price,stock});
    return res;
  }
);
export const getTmpBasket = createAsyncThunk(
  "getTmpBasket",
  async () => {
    const res = await storeTmpBasket.tmpBasket();
    return res;
  }
);
export const updateTmpBasket = createAsyncThunk(
    "putTmpBasket",
    async (id) => {
      const res = await storeTmpBasket.putTmpBasket(id);
      console.log(res);
      return res;
    }
  );


const tmpBasketSlice = createSlice({
  name: "tmpBasket",
  initialState,
  extraReducers: {
    [postTmpBasket.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [getTmpBasket.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateTmpBasket.fulfilled]: (state, action) => {
        const index = state.findIndex((item) => item === action.payload);
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      },
    
  },
});
const { reducer } = tmpBasketSlice;
export default reducer;