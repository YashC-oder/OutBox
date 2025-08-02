import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmailStatus } from '@/models/Email';

interface FiltersState {
  activeFilter: EmailStatus | 'All';
  searchQuery: string;
}

const initialState: FiltersState = {
  activeFilter: 'All',
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setActiveFilter(state, action: PayloadAction<EmailStatus | 'All'>) {
      state.activeFilter = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export const { setActiveFilter, setSearchQuery } = filtersSlice.actions;
export default filtersSlice.reducer;
