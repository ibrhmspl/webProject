import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Slices/authSlice";
import categoriesReducer from './Slices/categoriesSlice';
import productReducer from './Slices/productSlice';
import storeReducer from './Slices/storeSlice';
import tmpStoreReducer from './Slices/tmpStoreSlice';
import storeProductReducer from './Slices/storeProductSlice';
import tmpBasketReducer from './Slices/tmpBasketSlice';
// import mailReducer from './Slices/mailSlice';

const reducer = {
  auth: authReducer,
  categories: categoriesReducer,
  product:productReducer,
  store:storeReducer,
  tmpstore:tmpStoreReducer,
  storeProduct:storeProductReducer,
  tmpBasket:tmpBasketReducer,
//   mail:mailReducer,
}
const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export default store;