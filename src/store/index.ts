import { configureStore } from '@reduxjs/toolkit';
import {categoryFetch} from '@/store/api/category'
import {productFetch} from '@/store/api/product'
import {cartFetch, cartPost} from '@/store/api/cart'
import {authSection} from '@/store/api/auth'
import landingPageReducer from '@/store/slices/landingPage'
import searchPage from './slices/searchPage';
import checkoutPage from './slices/checkoutPage';
import cartPage from './slices/cartPage';

const store = configureStore({
  reducer: {
    [categoryFetch.reducerPath]: categoryFetch.reducer,
    [productFetch.reducerPath]: productFetch.reducer,
    [authSection.reducerPath]: authSection.reducer,
    [cartFetch.reducerPath]: cartFetch.reducer,
    [cartPost.reducerPath]: cartPost.reducer,
    dataBrand: landingPageReducer,
    dataDiscount: landingPageReducer,
    dataRating: landingPageReducer,
    dataCategory: landingPageReducer,
    dataSearch: searchPage,
    dataCheckout: checkoutPage,
    dataCart: cartPage
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