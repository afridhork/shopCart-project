import { configureStore } from '@reduxjs/toolkit';
import { categoryFetch } from '@/store/api/category';
import { productFetch } from '@/store/api/product';
import { cartFetch, cartPost } from '@/store/api/cart';
import { authSection } from '@/store/api/auth';
import brandReducer from '@/store/slices/brandSlice';
import discountReducer from '@/store/slices/discountSlice';
import ratingReducer from '@/store/slices/ratingSlice';
import categoryReducer from '@/store/slices/categorySlice';
import searchReducer from './slices/searchSlice';
import checkoutReducer from './slices/checkoutSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    [categoryFetch.reducerPath]: categoryFetch.reducer,
    [productFetch.reducerPath]: productFetch.reducer,
    [authSection.reducerPath]: authSection.reducer,
    [cartFetch.reducerPath]: cartFetch.reducer,
    [cartPost.reducerPath]: cartPost.reducer,
    dataBrand: brandReducer,
    dataDiscount: discountReducer,
    dataRating: ratingReducer,
    dataCategory: categoryReducer,
    dataSearch: searchReducer,
    dataCheckout: checkoutReducer,
    dataCart: cartReducer,
  },
  middleware: (getDefaultMiddleware)=>(
   getDefaultMiddleware()
     .concat(categoryFetch.middleware)
     .concat(productFetch.middleware)
     .concat(authSection.middleware)
     .concat(cartFetch.middleware)
     .concat(cartPost.middleware)
  )
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;