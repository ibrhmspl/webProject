import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as categoriesService from "../Services/categoriesService";
const initialState = [];
export const createCategories = createAsyncThunk(
  "postCategories",
  async (item) => {
    const res = await categoriesService.postCategories(item);
    return res.MainCategories;
  }
);
export const getCategories = createAsyncThunk(
  "getCategories",
  async () => {
    const res = await categoriesService.categories();
    return res.MainCategories;
  }
);
export const updateCategories = createAsyncThunk(
  "putCategories",
  async ({categoryId,name}) => {
    const res = await categoriesService.putCategories({categoryId,name});
    return res.data;
  }
);
export const deleteCategories = createAsyncThunk(
  "deleteCategories",
  async (categoryId) => {
    await categoriesService.deleteCategories(categoryId);
    return categoryId;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: {
    [createCategories.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [getCategories.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updateCategories.fulfilled]: (state, action) => {
      let index = state.findIndex((categoryId) => categoryId === action.payload);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteCategories.fulfilled]: (state, action) => {
      let index = state.findIndex((categoryId) => categoryId === action.payload.id);
      state.splice(index, 1);
    },
  },
});
const { reducer } = categoriesSlice;
export default reducer;