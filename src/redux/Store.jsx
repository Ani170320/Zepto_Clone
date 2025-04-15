import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import wishListReducer from './WishListSlice'; 


export const Store = configureStore({
  reducer: {
    wishlist: wishListReducer, 
    cart: cartReducer,
    //user:userReducer
  },
});