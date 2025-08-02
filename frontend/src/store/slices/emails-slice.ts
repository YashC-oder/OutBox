import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Email } from "@/models/Email";

interface EmailsState {
  emails: Email[];
  filteredEmails: Email[];
  selectedCategory: string;
  selectedFolder: string;
}

const initialState: EmailsState = {
  emails: [],
  filteredEmails: [],
  selectedCategory: "All",
  selectedFolder: "",
};

const emailsSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    setFilteredEmails(state, action) {
      state.filteredEmails = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedFolder(state, action) {
      state.selectedFolder = action.payload;
    },
    setEmails(state, action: PayloadAction<Email[]>) {
      state.emails = action.payload;
    },
    addEmail(state, action: PayloadAction<Email>) {
      state.emails.unshift(action.payload);
    },
    // setFilteredEmails(state, action: PayloadAction<Email[]>) {
    //   state.filteredEmails = action.payload;
    // },
  },
});

export const {
  setEmails,
  addEmail,
  setFilteredEmails,
  setSelectedCategory,
  setSelectedFolder,
} = emailsSlice.actions;
export default emailsSlice.reducer;
