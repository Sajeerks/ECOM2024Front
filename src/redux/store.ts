import { userAPI } from './api/userApi';
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './api/userReducer';
import { productAPI } from './api/productApi';
import { cartReducer } from './cartReducer';
import { orderApi } from './api/orderApi';




export const store = configureStore({
    reducer: {
      [productAPI.reducerPath]:productAPI.reducer,
      [userAPI.reducerPath]: userAPI.reducer,
      [userReducer.name] :userReducer.reducer,
      [cartReducer.name] :cartReducer.reducer,
      [orderApi.reducerPath] :orderApi.reducer,
      
 
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware, productAPI.middleware, orderApi.middleware),
    // middleware: (mid) => [
    //   ...mid(), 
    //   userAPI.middleware,
    
    // ],
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch


