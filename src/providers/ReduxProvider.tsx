"use client";
import React from "react";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Loading component while rehydrating
const LoadingScreen = () => (
  <div
    className="flex items-center justify-center min-h-screen bg-background"
    style={{ fontSize: "1rem" }}
  >
    <div className="text-center">
      <div className="w-[3em] h-[3em] border-[0.25em] border-primary border-t-transparent rounded-full animate-spin mx-auto mb-[1em]"></div>
      <p className="text-[1em] text-muted-foreground">Loading your cart...</p>
    </div>
  </div>
);

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
