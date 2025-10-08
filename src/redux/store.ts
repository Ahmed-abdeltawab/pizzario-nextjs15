import { Environments } from "@/constants/enums";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./fearures/cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine all reducers
const rootReducer = combineReducers({
  cart: cartSlice,
  // Add other reducers here in the future
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // Only persist cart state
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== Environments.PROD,
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
