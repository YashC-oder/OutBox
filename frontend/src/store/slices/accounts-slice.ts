import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '@/models/Account';

interface AccountsState {
  accounts: Account[];
}

const initialState: AccountsState = {
  accounts: [],
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setAccounts(state, action: PayloadAction<Account[]>) {
      state.accounts = action.payload;
    },
    addAccount(state, action: PayloadAction<Account>) {
      state.accounts.push(action.payload);
    },
    updateAccount(
      state,
      action: PayloadAction<{ index: number; updated: Partial<Account> }>
    ) {
      const { index, updated } = action.payload;
      if (index >= 0 && index < state.accounts.length) {
        state.accounts[index] = { ...state.accounts[index], ...updated };
      }
    },
    removeAccount(state, action: PayloadAction<number>) {
      state.accounts.splice(action.payload, 1);
    },
  },
});

export const { setAccounts, addAccount, updateAccount, removeAccount } =
  accountsSlice.actions;

export default accountsSlice.reducer;
