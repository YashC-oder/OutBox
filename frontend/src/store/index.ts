import { configureStore } from "@reduxjs/toolkit";
import emailsReducer from "./slices/emails-slice";
import filtersReducer from "./slices/filters-slice";
import accountsReducer from "./slices/accounts-slice";

export const store = configureStore({
  reducer: {
    emails: emailsReducer,
    filters: filtersReducer,
    accounts: accountsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;