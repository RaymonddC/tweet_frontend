import { configureStore } from '@reduxjs/toolkit';

import UserReducer from '.././Features/User/UserSlice';
import TweetReducer from '.././Features/Tweet/TweetSlice';

export const Store = configureStore({
  reducer: {
    user: UserReducer,
    tweet: TweetReducer,
    // product: productSlice,
    // category: CategoryReducer,
    // orderMenu: orderMenuReducer,
    // transaction: transactionReducer,
  },
});
